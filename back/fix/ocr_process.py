import easyocr
import numpy as np
from sharp import sharpen_image

class OCRProcessor:
  def __init__ (self):
    self.reader = easyocr.Reader(['ru', 'en'])
  
  def process_image(self, image: bytes):
    np_array = np.frombuffer(image, dtype=np.uint8)
    final_image = sharpen_image(np_array)
    result = self.reader.readtext(final_image, detail=0)
    return result