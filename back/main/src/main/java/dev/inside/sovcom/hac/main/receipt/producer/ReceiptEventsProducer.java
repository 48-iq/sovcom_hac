package dev.inside.sovcom.hac.main.receipt.producer;

import dev.inside.sovcom.hac.main.receipt.events.ReceiptEvent;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ReceiptEventsProducer {
    @Autowired
    private AmqpTemplate amqpTemplate;

    public void sendMessage(ReceiptEvent message) {
        amqpTemplate.convertAndSend("receipt-events-topic", message);
    }
}
