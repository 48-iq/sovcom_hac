import re
import easyocr
import cv2
import numpy as np
from typing import Optional, Dict
from rabbitmq_producer import RabbitMQProducer
from shop_service import ShopService


class Producer:
    def __init__(self, partners: list, rabbitmq_host: str = 'localhost'):
        self.partners = ShopService().get_partner_shops()
        self.rabbitmq_host = rabbitmq_host

    def extract_text(self, image: np.ndarray) -> str:
        """Извлекает весь текст одной строкой"""
        results = self.reader.readtext(image, detail=0)
        return ' '.join(results).replace('\n', ' ')

    def find_datetime(self, text: str) -> Dict[str, str]:
        """Ищет время и дату в тексте"""
        time_pattern = r'\b([01]?\d|2[0-3]):([0-5]\d)\b'
        date_pattern = r'\b(0?[1-9]|[12]\d|3[01])\.(0?[1-9]|1[0-2])\.(20\d{2})\b'

        time_match = re.search(time_pattern, text)
        date_match = re.search(date_pattern, text)

        return {
            'time': time_match.group() if time_match else None,
            'date': date_match.group() if date_match else None
        }

    def find_partner(self, text: str) -> Optional[str]:
        """Ищет первый подходящий магазин-партнер"""
        text_lower = text.lower()
        for partner in self.partners:
            if partner.lower() in text_lower:
                return partner
        return None

    def process_receipt(self, text: str, request_id: str) -> bool:
        """Обрабатывает чек и отправляет результат"""
        try:
            datetime_info = self.find_datetime(text)
            partner = self.find_partner(text)

            if not all([datetime_info['time'], datetime_info['date'], partner]):
                return False

            message = {
                "requestId": request_id,
                "time": datetime_info['time'],
                "date": datetime_info['date'],
                "partner": partner
            }

            with RabbitMQProducer(host=self.rabbitmq_host) as producer:
                producer.send_message(message)

            return True

        except Exception as e:
            print(f"Ошибка обработки чека: {e}")
            return False