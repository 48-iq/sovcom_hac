from ocr_process import OCRProcessor
from mongo_client import MongoClient

class Logic:
  def __init__(self, ocr: OCRProcessor = OCRProcessor()):
    self.ocr = ocr
    self.mongo = MongoClient()
  
  def process_receipt(self, image: bytes) -> dict:
    text_arr = self.ocr.process_image(image)
    text = " ".join(text_arr)

