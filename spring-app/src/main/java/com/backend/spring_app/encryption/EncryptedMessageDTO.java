package com.backend.spring_app.encryption;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor

public class EncryptedMessageDTO {
    private Long id;
    private String encryptedText;
    private LocalDateTime timestamp;
}
