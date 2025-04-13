package com.backend.spring_app.security;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/session")
public class SessionController {

    @GetMapping("/check")
    public ResponseEntity<Void> checkSession(Authentication authentification){
        if(authentification != null && authentification.isAuthenticated()){
            return ResponseEntity.ok().build();
        } else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
