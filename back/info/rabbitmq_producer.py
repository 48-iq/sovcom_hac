import pika
import json
import logging

class RabbitMQProducer:
    def __init__(self, host='localhost', queue='receipt-result-events-topic'):
        self.host = host
        self.queue = queue
        self._connect()

    def _connect(self):
        """Устанавливаем соединение с RabbitMQ"""
        try:
            self.connection = pika.BlockingConnection(
                pika.ConnectionParameters(host=self.host)
            )
            self.channel = self.connection.channel()
            self.channel.queue_declare(
                queue=self.queue,
                durable=True
            )
        except Exception as e:
            logging.error(f"Connection error: {e}")
            raise

    def send_message(self, message: dict):
        """Отправка сообщения в очередь"""
        try:
            self.channel.basic_publish(
                exchange='',
                routing_key=self.queue,
                body=json.dumps(message),
                properties=pika.BasicProperties(
                    delivery_mode=2,
                    content_type='application/json'
                )
            )
            logging.info(f"Sent to {self.queue}: {message}")
        except pika.exceptions.AMQPConnectionError:
            logging.warning("Reconnecting...")
            self._connect()
            self.send_message(message)
        except Exception as e:
            logging.error(f"Send error: {e}")
            raise

    def close(self):
        """Закрытие соединения"""
        if hasattr(self, 'connection') and self.connection.is_open:
            self.connection.close()

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.close()