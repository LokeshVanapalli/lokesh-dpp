package com.lokesh.dpp.exception;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public final ResponseEntity<Object> handleAllRuntime(RuntimeException ex, WebRequest request) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("error", ex.getMessage()));
    }

    static class ErrorResponse {
        public String error;
        public String message;
        public ErrorResponse(String error, String message) { this.error = error; this.message = message; }
    }
}
