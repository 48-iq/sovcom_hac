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
        self.api_url = os.getenv('SHOPS_API_URL')
        self.timeout = int(os.getenv('API_TIMEOUT', 10))

    def get_partner_shops(self) -> Optional[List[str]]:
    
        endpoint = f"{self.api_url}/api/v1/shops/partners"
        headers = {
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