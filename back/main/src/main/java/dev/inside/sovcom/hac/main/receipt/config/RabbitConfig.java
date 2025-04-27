package dev.inside.sovcom.hac.main.receipt.config;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig {
    @Bean
    public Queue myQueue() {
        return new Queue("receipt-events-topic", false);
    }

    @Bean
    public Queue myInfoQueue() {
        return new Queue("receipt-result-events-topic", false);
    }
}
