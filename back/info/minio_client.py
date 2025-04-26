from minio import Minio
from minio.error import S3Error
from io import BytesIO
import os
from dotenv import load_dotenv
from typing import Optional

load_dotenv()

class MinIOClient:
    def __init__(self):
        self.client = Minio(
            endpoint=os.getenv('MINIO_ENDPOINT', 'localhost:9000'),
            access_key=os.getenv('MINIO_ACCESS_KEY'),
            secret_key=os.getenv('MINIO_SECRET_KEY'),
            secure=os.getenv('MINIO_SECURE', 'false').lower() == 'true'
        )
        self.default_bucket = os.getenv('MINIO_BUCKET', 'receipts')

    def get_file(self, filename: str, bucket: Optional[str] = None) -> Optional[BytesIO]:
        """Получает файл из MinIO и возвращает как BytesIO"""
        try:
            bucket = bucket or self.default_bucket
            response = self.client.get_object(bucket, filename)
            return BytesIO(response.data)
        except S3Error as e:
            print(f"MinIO Error: {e}")
            return None
        except Exception as e:
            print(f"Unexpected error: {e}")
            return None

    def check_bucket_exists(self, bucket: Optional[str] = None) -> bool:
        """Проверяет существование бакета"""
        bucket = bucket or self.default_bucket
        return self.client.bucket_exists(bucket)