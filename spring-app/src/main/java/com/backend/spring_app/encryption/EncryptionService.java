package com.backend.spring_app.encryption;

import com.backend.spring_app.appuser.AppUser;
import org.springframework.stereotype.Service;
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EncryptionService {

    private static final String KEY = "5839257684920485";
    private final EncryptedMessageRepository repository;

    public EncryptionService(EncryptedMessageRepository repository){
        this.repository = repository;
    }

    //encrypcja wiadomosci i zapis do bazy
    public String encryptAndSave(String message, AppUser user){
        String encrypted = encrypt(message);

        EncryptedMessage entity = EncryptedMessage.builder()
                .encryptedText(encrypted)
                .timestamp(LocalDateTime.now())
                .user(user)
                .build();
        repository.save(entity);
        return encrypted;
    }

    //encrypcja wiadomosci
    public String encrypt(String message) {
        try {
            SecretKeySpec key = new SecretKeySpec(KEY.getBytes(), "AES");
            Cipher cipher = Cipher.getInstance("AES");

            cipher.init(Cipher.ENCRYPT_MODE, key);
            byte[] encrypted = cipher.doFinal(message.getBytes());

            return Base64.getEncoder().encodeToString(encrypted);
        } catch (Exception e) {
            throw new RuntimeException("Encryption Failed", e);
        }
    }

    //decrypcja wiadomosci
    public String decrypt(String encryptedMessage) {
        try {
            SecretKeySpec key = new SecretKeySpec(KEY.getBytes(), "AES");
            Cipher cipher = Cipher.getInstance("AES");

            cipher.init(Cipher.DECRYPT_MODE, key);
            byte[] decrypted = Base64.getDecoder().decode(encryptedMessage);

            return new String(cipher.doFinal(decrypted));
        } catch (Exception e) {
            throw new RuntimeException("Decryption Failed", e);
        }
    }

    //wurzucenie historii wiadomosci dla uzytkownika
    public List<EncryptedMessageDTO> getAllEncryptedMessagesForUser(AppUser user){
        return repository.findByUser(user)
                .stream()
                .map(msg -> new EncryptedMessageDTO(
                        msg.getId(),
                        msg.getEncryptedText(),
                        msg.getTimestamp()
                ))
                .collect(Collectors.toList());
    }
}
