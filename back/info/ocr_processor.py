from typing import Dict, Optional, Union
from io import BytesIO
from minio_client import MinIOClient
import sharpening as sharpening
import numpy as np

class OCRProcessor:
    def __init__(self, 
                 languages: list = ['ru', 'en'],
                 storage_client: Optional[MinIOClient] = None):
        import easyocr
        self.reader = easyocr.Reader(languages)
        self.storage = storage_client

    def process_image(self, image_source: Union[str, BytesIO]) -> Optional[Dict]:
        try:
            np_array = np.frombuffer(image_source, dtype=np.uint8)

            final_image = sharpening.edge_aware_sharpen(np_array)

            result = self.reader.readtext(final_image, detail=0)
            return {
                "text": " ".join(result),
                "status": "success",
                "source": "minio" if isinstance(image_source, BytesIO) else "local_file"
            }
        except Exception as e:
            print(f"OCR processing failed: {e}")
            return None

    def process_from_storage(self, filename: str) -> Optional[Dict]:
        if not self.storage:
            raise ValueError("Storage client not initialized")
        
        image_data = self.storage.get_file(filename)
        if not image_data:
            return None
            
        return self.process_image(image_data)