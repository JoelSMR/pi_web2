package com.example.user.service;

import com.example.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RetrieveAllUsersUseCase {

    private final UserRepository userRepository;

    public RetrieveAllUsersUseCase(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Recupera todos los usuarios de la base de datos.
     * @return Una lista de objetos User.
     */
    public List<com.example.user.entity.User> execute() {
        return userRepository.findAll();
    }
}