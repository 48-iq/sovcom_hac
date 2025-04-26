import cv2
import numpy as np
from typing import Optional

def sharpen_image(image: np.ndarray, 
                 kernel_size: int = 3,
                 strength: float = 1.0) -> Optional[np.ndarray]:
    """
    Повышает резкость изображения с помощью фильтра Unsharp Mask
    
    Args:
        image: Входное изображение в формате BGR (numpy array)
        kernel_size: Размер ядра Гаусса (нечетное число)
        strength: Сила эффекта резкости (рекомендуется 0.5-2.0)
        
    Returns:
        np.ndarray: Изображение с повышенной резкостью или None при ошибке
    """
    try:
        # Проверка входных данных
        if not isinstance(image, np.ndarray):
            raise ValueError("Input must be a numpy array")
            
        if len(image.shape) not in (2, 3):
            raise ValueError("Invalid image dimensions")
            
        if kernel_size % 2 == 0:
            kernel_size += 1  # Делаем нечетным
            
        # Конвертация в float32 для точных вычислений
        image_float = image.astype(np.float32) / 255.0
        
        # 1. Размытие по Гауссу
        blurred = cv2.GaussianBlur(image_float, (kernel_size, kernel_size), 0)
        
        # 2. Unsharp Mask (разница между оригиналом и размытым)
        sharpened = cv2.addWeighted(
            image_float, 1.0 + strength, 
            blurred, -strength, 
            0
        )
        
        # Возвращаем к исходному диапазону и типу
        sharpened = np.clip(sharpened * 255, 0, 255).astype(np.uint8)
        
        return sharpened
        
    except Exception as e:
        print(f"Sharpening error: {e}")
        return None


def edge_aware_sharpen(image: np.ndarray,
                      sigma_s: float = 10,
                      sigma_r: float = 0.1) -> Optional[np.ndarray]:
    """
    Умное повышение резкости с учетом границ (Edge-Aware)
    
    Args:
        image: Входное изображение BGR
        sigma_s: Размер области для анализа (10-100)
        sigma_r: Чувствительность к границам (0.1-0.3)
        
    Returns:
        np.ndarray: Обработанное изображение или None
    """
    try:
        # 1. Детализированная компонента
        detail = cv2.detailEnhance(image, sigma_s=sigma_s, sigma_r=sigma_r)
        
        # 2. Увеличение резкости
        sharpened = cv2.addWeighted(
            image, 0.5,
            detail, 0.5,
            0
        )
        
        return sharpened
    except Exception as e:
        print(f"Edge-aware sharpening error: {e}")
        return None