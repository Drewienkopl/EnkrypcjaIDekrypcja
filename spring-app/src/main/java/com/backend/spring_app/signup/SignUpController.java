package com.backend.spring_app.signup;

import com.backend.spring_app.appuser.AppUser;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/v1/signup")
@AllArgsConstructor
public class SignUpController {

    private SignUpService signUpService;
    private final AuthenticationManager authenticationManager;

    @PostMapping
    public ResponseEntity<String> signUp(@RequestBody SignUpRequest request, HttpServletRequest httpServletRequest) {

        AppUser user = signUpService.signUp(request); //rejestracja uzytkownika do bazy

        UsernamePasswordAuthenticationToken authenticationToken =  //stworzenie tokena z danymi logowania
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword());
        try {
            Authentication authentication = authenticationManager.authenticate(authenticationToken); //authentykacja przez Spring security
            SecurityContextHolder.getContext().setAuthentication(authentication); //ustawienie autoryzacji w spring security

            HttpSession session = httpServletRequest.getSession(true); //wymusza tworzenie sesji
            session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());

            user = (AppUser) authentication.getPrincipal();
            session.setAttribute("user", user);

            return ResponseEntity.ok("Signed in and logged in");
        } catch (AuthenticationException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Inwavid credentials");
        }
    }
}
