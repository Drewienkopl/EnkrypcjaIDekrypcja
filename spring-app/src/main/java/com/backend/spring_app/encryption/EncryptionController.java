package com.backend.spring_app.encryption;

import com.backend.spring_app.appuser.AppUser;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/encryption")
@RequiredArgsConstructor

public class EncryptionController {

    private final EncryptionService encryptionService;

    @PostMapping
    public ResponseEntity<EncryptionResponse> handleEncryption(@RequestBody EncryptionRequest request, HttpSession session){
        AppUser user = (AppUser) session.getAttribute("user");

        if(user == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String result = request.isDecrypt()
                ? encryptionService.decrypt(request.getMessage())
                : encryptionService.encryptAndSave(request.getMessage(), user);

        return ResponseEntity.ok(new EncryptionResponse(result));
    }

    @GetMapping("/history")
    public ResponseEntity<List<EncryptedMessageDTO>> getUserHistory(HttpSession httpSession) {
        AppUser user = (AppUser) httpSession.getAttribute("user");

        if(user == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        List<EncryptedMessageDTO> messages = encryptionService.getAllEncryptedMessagesForUser(user);
        System.out.println("Znaleziono wiadomości: " + messages.size());
        return ResponseEntity.ok(messages);
    }
}
