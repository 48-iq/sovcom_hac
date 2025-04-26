import re
import pika
import json
from typing import Optional, Dict
from ocr_processor import OCRProcessor
from minio_client import MinIOClient
from producer import Producer

class ReceiptProcessor:
    def __init__(self):
        self.storage = MinIOClient()
        self.ocr = OCRProcessor(storage_client=self.storage)

    def process_message(self, message: Dict) -> Dict:
        result = {
            "requestId": message.get('requestId'),
            "filename": message.get('filename'),
            "status": "failed"
        }

        if not all(k in message for k in ['requestId', 'filename']):
            result["error"] = "Invalid message format"
            return result

        ocr_result = self.ocr.process_from_storage(message['filename'])
        if ocr_result:
            result.update({
                "status": "processed",
                "text": ocr_result["text"],
                "source": ocr_result["source"]
            })
        else:
            result["error"] = "Processing failed"

        return result

    def callback(self, ch, method, properties, body):
        """Callback для RabbitMQ"""
        try:
            message = json.loads(body)
            print(f"Processing request: {message['requestId']}")
            
            result = self.process_message(message)

            text = result['text']
            print(f"Result: {text}")
            request_id = result['request_id']
            print(f"Result[{request_id}")

            Producer().process_receipt(text=text,request_id=request_id)

            print(f"Result: {result['status']}")

            ch.basic_ack(delivery_tag=method.delivery_tag)
        except json.JSONDecodeError:
            print("Invalid JSON received")
            ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)
        except Exception as e:
            print(f"Processing error: {e}")
            ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)

    def start_consuming(self):
        """Запуск потребителя"""
        connection = pika.BlockingConnection(
            pika.ConnectionParameters('localhost')
        )
        channel = connection.channel()
        channel.queue_declare(queue='receipt-events-topic', durable=True)
        channel.basic_consume(
            queue='receipt-events-topic',
            on_message_callback=self.callback,
            auto_ack=False
        )
        print("Waiting for messages...")
        channel.start_consuming()

# if __name__ == '__main__':
#     processor = ReceiptProcessor()
#     processor.start_consuming()