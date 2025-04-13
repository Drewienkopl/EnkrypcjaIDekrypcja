package com.backend.spring_app.signup;

import com.backend.spring_app.appuser.AppUser;
import com.backend.spring_app.appuser.AppUserRole;
import com.backend.spring_app.appuser.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class SignUpService {

    private final AppUserService appUserService;
    private final EmailValidator emailValidator;

    public AppUser signUp(SignUpRequest request) {
        boolean isValidEmail = emailValidator.test(request.getEmail());

        if(!isValidEmail){
            throw new IllegalStateException("email not valid");
        }

        return appUserService.signUpUser(
                new AppUser(
                        request.getFirstname(),
                        request.getLastname(),
                        request.getEmail(),
                        request.getPassword(),
                        AppUserRole.USER
                )
        );
    }
}
