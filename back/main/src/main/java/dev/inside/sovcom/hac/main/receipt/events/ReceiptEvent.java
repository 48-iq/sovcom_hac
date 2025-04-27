package dev.inside.sovcom.hac.main.receipt.events;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReceiptEvent {
    private String requestId;
    private String filename;
}
