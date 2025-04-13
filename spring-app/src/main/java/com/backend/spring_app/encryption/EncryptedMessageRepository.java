package com.backend.spring_app.encryption;

import com.backend.spring_app.appuser.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EncryptedMessageRepository extends JpaRepository<EncryptedMessage, Long> {
    List<EncryptedMessage> findByUser(AppUser user);
}
