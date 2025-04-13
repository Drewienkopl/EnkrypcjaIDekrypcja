package com.backend.spring_app.signup;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class SignUpRequest {
    private final String firstname;
    private final String lastname;
    private final String email;
    private final String password;
}
