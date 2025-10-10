package com.example.user.service;

import org.springframework.stereotype.Service;

import com.example.user.repository.UserRepository;

import java.util.Optional;

// Usa @Service para que Spring lo maneje y pueda ser inyectado
@Service 
public class CheckLoginUseCase {

    // Dependencia del Repositorio (Interfaz de Spring Data JPA)
    private final UserRepository userRepository;

    // Inyección de dependencia a través del constructor
    public CheckLoginUseCase(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Lógica de negocio para verificar el login.
     * @param email Email del usuario.
     * @param password Contraseña proporcionada.
     * @return true si las credenciales son válidas, false en caso contrario.
     */
    public boolean check(String email, String password) {
        
        // 1. Buscar al usuario por email
        // Asumimos que UserRepository tiene un método findByEmail() (lo crearemos luego)
        Optional<com.example.usuario.entity.User> userOptional = 
            userRepository.findByEmail(email);

        // 2. Si el usuario no existe, retornar false
        if (userOptional.isEmpty()) {
            return false;
        }

        // 3. Si el usuario existe, verificar la contraseña
        // Por simplicidad, aquí comparamos la cadena plana.
        com.example.usuario.entity.User user = userOptional.get();
        return user.getPassword().equals(password);
    }
}