package com.backend.spring_app.security;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;

//filter do ochrona przed atakami XSS i innymi
@Component
public class SecurityHeadersFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
        throws IOException, ServletException{

        HttpServletResponse httpServletResponse = (HttpServletResponse) response;

        httpServletResponse.setHeader("X-Content-Type-Options", "nosniff");
        httpServletResponse.setHeader("X-Frame-Options", "DENY");
        httpServletResponse.setHeader("X-XSS-Protection", "1; mode=block"); // nadal wspierane w niektórych przeglądarkach
        httpServletResponse.setHeader("Referrer-Policy", "no-referrer");
        httpServletResponse.setHeader("Permissions-Policy", "geolocation=(), microphone=()");
        httpServletResponse.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'; object-src 'none';");

        chain.doFilter(request, response);
    }
}
