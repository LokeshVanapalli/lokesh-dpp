package com.lokesh.dpp.service;

import com.lokesh.dpp.dto.AuthRequest;
import com.lokesh.dpp.dto.AuthResponse;
import com.lokesh.dpp.dto.RegisterRequest;
import com.lokesh.dpp.model.User;
import com.lokesh.dpp.repository.UserRepository;
import com.lokesh.dpp.config.JwtTokenProvider;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Set;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public AuthResponse login(AuthRequest req) {
        User user = userRepository.findByUsername(req.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        String token = jwtTokenProvider.generateToken(user.getUsername());
        return new AuthResponse(token, null);
    }

    public User register(RegisterRequest req) {
        if (userRepository.existsByUsername(req.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        String hashed = passwordEncoder.encode(req.getPassword());
        return userRepository.save(new User(){{
            setUsername(req.getUsername());
            setEmail(req.getEmail());
            setPassword(hashed);
            setRoles(Set.of("ROLE_USER"));
        }});
    }
}
