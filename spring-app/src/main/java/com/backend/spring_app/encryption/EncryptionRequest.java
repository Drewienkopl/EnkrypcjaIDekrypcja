package com.backend.spring_app.encryption;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class EncryptionRequest {
    private String message;
    private boolean decrypt;
}
