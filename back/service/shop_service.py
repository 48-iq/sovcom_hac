import requests
from typing import List, Optional
import os
from dotenv import load_dotenv
import logging

# Настройка логирования
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()

class ShopService:
    def __init__(self):
        self.api_url = os.getenv('SHOPS_API_URL', 'http://partner-api.example.com')
        self.api_key = os.getenv('SHOPS_API_KEY')
        self.timeout = int(os.getenv('API_TIMEOUT', 10))

    def get_partner_shops(self) -> Optional[List[str]]:
        """
        Получает список магазинов-партнеров из API
        
        Returns:
            List[str]: Список названий магазинов или None при ошибке
        """
        endpoint = f"{self.api_url}/v1/shops/partners"
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }

        try:
            response = requests.get(
                endpoint,
                headers=headers,
                timeout=self.timeout
            )
            response.raise_for_status()
            
            shops = response.json().get('shops', [])
            logger.info(f"Получено {len(shops)} магазинов")
            return shops
            
        except requests.exceptions.RequestException as e:
            logger.error(f"Ошибка при запросе к API магазинов: {str(e)}")
            return None