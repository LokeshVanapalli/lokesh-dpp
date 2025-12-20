package com.lokesh.dpp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    // private final JwtAuthenticationFilter jwtFilter;

    // public SecurityConfig(JwtAuthenticationFilter jwtFilter) {
    //     this.jwtFilter = jwtFilter;
    // }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            // 🔥 completely disable default login mechanisms
            .formLogin(form -> form.disable())
            .httpBasic(basic -> basic.disable())

            // 🔥 allow H2 console without CSRF
            .csrf(csrf -> csrf.ignoringRequestMatchers("/h2-console/**"))

            // 🔥 allow iframe rendering (required for H2 UI)
            .headers(headers -> headers.frameOptions(frame -> frame.sameOrigin()))

            // JWT = stateless
            .sessionManagement(sess ->
                sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // authorization
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/h2-console/**").permitAll()
                .requestMatchers("/api/auth/**").permitAll()
                .anyRequest().authenticated()
            );

            // JWT filter
            // .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
