package com.example.user.service;

import org.springframework.stereotype.Service;

import com.example.user.entity.User;
import com.example.user.repository.UserRepository;

import java.util.Optional;

@Service 
public class CreateUserUseCase {

    private final UserRepository userRepository;

    // Inyección de dependencia
    public CreateUserUseCase(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Lógica para crear y guardar un nuevo usuario.
     * @param user El objeto User a guardar.
     * @return El objeto User guardado (con su ID generado).
     */
    public User execute(User user) {
        
        // 1. Lógica de Negocio (Ejemplo: Evitar emails duplicados)
        Optional<User> existingUser = Optional.empty();
        if (existingUser.isPresent()) {
            // En un caso real, lanzarías una excepción específica de negocio (ej. DuplicateEmailException)
            throw new RuntimeException("El email " + user.getEmail() + " ya está registrado.");
        }

        return userRepository.save(user);
    }
}