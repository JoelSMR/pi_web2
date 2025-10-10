package com.example.user.service;

import org.springframework.stereotype.Service;

import com.example.user.repository.UserRepository;

@Service
public class DeleteUserUseCase {

    private final UserRepository userRepository;

    public DeleteUserUseCase(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Elimina un usuario por su ID.
     * @param id El ID del usuario a eliminar.
     */
    public void execute(Long id) {
        userRepository.deleteById(id);
    }
}