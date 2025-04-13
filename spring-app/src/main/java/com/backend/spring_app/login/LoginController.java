package com.backend.spring_app.login;

import com.backend.spring_app.appuser.AppUser;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/login")
@RequiredArgsConstructor
public class LoginController {

    private final LoginService loginService;
    private final AuthenticationManager authenticationManager;

//    @RequestMapping(method = RequestMethod.POST)
    @PostMapping
    public ResponseEntity<String> login(@RequestBody LoginRequest request, HttpServletRequest httpServletRequest) {
        UsernamePasswordAuthenticationToken authenticationToken =  //stworzenie tokena z danymi logowania
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword());
        try {
            Authentication authentication = authenticationManager.authenticate(authenticationToken); //authentykacja przez Spring security
            SecurityContextHolder.getContext().setAuthentication(authentication); //ustawienie autoryzacji w spring security

            HttpSession session = httpServletRequest.getSession(true); //wymusza tworzenie sesji
            session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());

            AppUser user = (AppUser) authentication.getPrincipal();
            session.setAttribute("user", user);

            return ResponseEntity.ok("Login succesful");
        } catch (AuthenticationException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Inwavid credentials");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session){
        session.invalidate();
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok("logged out");
    }
}