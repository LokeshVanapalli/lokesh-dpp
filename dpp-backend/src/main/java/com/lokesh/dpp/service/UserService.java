package com.lokesh.dpp.service;

import com.lokesh.dpp.model.User;
import com.lokesh.dpp.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {
    private final UserRepository userRepository;
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(String username, String email, String hashedPassword, Set<String> roles) {
        User u = new User();
        u.setUsername(username);
        u.setEmail(email);
        u.setPassword(hashedPassword);
        u.setRoles(roles);
        return userRepository.save(u);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
