package dev.inside.sovcom.hac.main.receipt.controller;

import dev.inside.sovcom.hac.main.receipt.dto.NewReceiptDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/receipt")
public class ReceiptController {

    @PostMapping
    public ResponseEntity<NewReceiptDto> receipt() {
        return null;
    }
}
