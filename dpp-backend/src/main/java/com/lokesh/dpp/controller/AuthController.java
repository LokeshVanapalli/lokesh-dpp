package com.lokesh.dpp.controller;

import com.lokesh.dpp.dto.AuthRequest;
import com.lokesh.dpp.dto.AuthResponse;
import com.lokesh.dpp.dto.RegisterRequest;
import com.lokesh.dpp.dto.RegisterResponse;
import com.lokesh.dpp.service.AuthService;
import com.lokesh.dpp.model.User;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final AuthService authService;
    public AuthController(AuthService authService) { this.authService = authService; }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@Valid @RequestBody RegisterRequest req) {
        User u = authService.register(req);
        return ResponseEntity.status(201).body(new RegisterResponse(u.getUsername(), "Registration successful"));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest req) {
        AuthResponse res = authService.login(req);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody String refreshToken) {
        // optional: implement refresh logic
        return ResponseEntity.status(501).body("Not implemented");
    }
}
