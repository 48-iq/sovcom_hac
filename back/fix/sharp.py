import cv2
import numpy as np

def sharpen_image(image: np.ndarray, kernel_size: tuple = (3, 3), sigma: float = 1.0, alpha: float = 1.5, beta: float = -0.5) -> np.ndarray:
    if len(image.shape) == 3:  # Если цветное (BGR)
        blurred = cv2.GaussianBlur(image, kernel_size, sigma)
    else:  # Если grayscale
        blurred = cv2.GaussianBlur(image, kernel_size, sigma)
    
    sharpened = cv2.addWeighted(image, alpha, blurred, beta, 0)
    return sharpened