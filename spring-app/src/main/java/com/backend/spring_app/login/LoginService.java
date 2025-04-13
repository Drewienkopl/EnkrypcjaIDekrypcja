package com.backend.spring_app.login;

import com.backend.spring_app.appuser.AppUser;
import com.backend.spring_app.appuser.AppUserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final AppUserRepository appUserRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final AuthenticationManager authenticationManager;

    public AppUser loginUser(LoginRequest request, HttpServletRequest httpServletRequest) {

        AppUser user = appUserRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalStateException("Account does not exist"));

        if (!bCryptPasswordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalStateException("Invalid password");
        }

        return user;
    }
}