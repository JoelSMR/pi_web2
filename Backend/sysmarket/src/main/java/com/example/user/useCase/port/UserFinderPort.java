package com.example.user.useCase.port;

import java.util.List;

import com.example.user.entity.User;

// Interfaz (Puerto) que define el contrato para obtener usuarios.
public interface UserFinderPort {
    
 
    List<User> findAll();
}