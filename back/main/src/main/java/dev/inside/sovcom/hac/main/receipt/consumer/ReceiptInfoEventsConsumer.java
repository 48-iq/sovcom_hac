package dev.inside.sovcom.hac.main.receipt.consumer;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class ReceiptInfoEventsConsumer {
    @RabbitListener(queues = "myQueue")
    public void receiveMessage(String message) {

        System.out.println("Received: " + message);
    }
}
