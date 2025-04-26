# from ocr.ocr_processor import OCRProcessor
# import easyocr
# from PIL import Image
# import numpy as np

# # Загрузка изображения в numpy array с помощью Pillow
# image = Image.open('images/test.png')  # Открываем изображение
# image_np = np.array(image)  # Конвертация в numpy array (RGB)

# # Создание ридера EasyOCR
# reader = easyocr.Reader(['ru', 'en'])

# # Распознавание текста
# results = reader.readtext(image_np, detail = 0, paragraph=True, y_ths=0.3)

# # Вывод результатов
# print(results)

from receipt_processor import ReceiptProcessor

if __name__ == '__main__':
    processor = ReceiptProcessor()
    processor.start_consuming()
