package com.example.user.service;

import org.springframework.stereotype.Service;

import com.example.user.entity.User;
import com.example.user.repository.UserRepository;

import java.util.Optional;

@Service
public class UpdateUserUseCase {

    private final UserRepository userRepository;

    public UpdateUserUseCase(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Actualiza un usuario existente.
     * @param user El objeto User con los nuevos datos.
     * @return El usuario actualizado, o Optional.empty() si no existe el ID.
     */
    public Optional<User> execute(User user) {
        // La actualización requiere que el ID esté presente
        if (user.getId() == null) {
            return Optional.empty();
        }

        // 1. Verificar si el usuario realmente existe en la BD
        Optional<User> existingUser = userRepository.findById(user.getId());

        if (existingUser.isPresent()) {
            // 2. Si existe, guardamos el nuevo objeto. Spring Data JPA lo actualizará
            // automáticamente porque el objeto tiene ID.
            User updatedUser = userRepository.save(user);
            return Optional.of(updatedUser);
        }

        // 3. Si no existe, retornamos Optional vacío
        return Optional.empty();
    }
}