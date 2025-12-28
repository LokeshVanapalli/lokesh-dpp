package com.lokesh.dpp.service;

import com.lokesh.dpp.config.JwtTokenProvider;
import com.lokesh.dpp.dto.AuthRequest;
import com.lokesh.dpp.dto.AuthResponse;
import com.lokesh.dpp.dto.RegisterRequest;
import com.lokesh.dpp.model.User;
import com.lokesh.dpp.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthService(UserRepository userRepository, JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public AuthResponse login(AuthRequest req) {
        User user = userRepository.findByUsername(req.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        // TEMP: plain-text check (JWT & hashing later)
        if (!req.getPassword().equals(user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtTokenProvider.generateToken(user.getUsername());

        return new AuthResponse(token, "Login success");
    }

    public User register(RegisterRequest req) {
        if (userRepository.existsByUsername(req.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setUsername(req.getUsername());
        user.setEmail(req.getEmail());
        user.setPassword(req.getPassword()); // TEMP: no hashing
        user.setRoles(Set.of("ROLE_USER"));

        return userRepository.save(user);
    }
}