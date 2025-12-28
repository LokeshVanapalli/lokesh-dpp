package com.lokesh.dpp.config;

import java.util.Date;
import java.lang.IllegalArgumentException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.security.Key;


@Component
public class JwtTokenProvider {
    private final Key key;
    private final long jwtExpirationInMs;

    public JwtTokenProvider(@Value("${app.jwt.secret}") String secret, 
                            @Value("${app.jwt.jwtExpirationInMs}") long jwtExpirationInMs) {
            this.key = Keys.hmacShaKeyFor(secret.getBytes());
            this.jwtExpirationInMs = jwtExpirationInMs;
    }

    public String generateToken(String username){
        Date now  = new Date();
        Date expiredAt = new Date(now.getTime() + jwtExpirationInMs);

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(expiredAt)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String getUsername(String token){
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token){
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

}