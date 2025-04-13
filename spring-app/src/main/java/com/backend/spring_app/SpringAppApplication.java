package com.backend.spring_app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = {"com.backend.spring_app.appuser", "com.backend.spring_app.login", "com.backend.spring_app.encryption", "com.backend.spring_app.security", "com.backend.spring_app.config.security"})
@EnableJpaRepositories(basePackages = {"com.backend.spring_app.appuser", "com.backend.spring_app.login", "com.backend.spring_app.encryption", "com.backend.spring_app.security", "com.backend.spring_app.config.security"})

public class SpringAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringAppApplication.class, args);
	}

}
