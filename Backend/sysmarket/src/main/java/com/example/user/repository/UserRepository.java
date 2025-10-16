package com.example.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.user.entity.User;

import java.util.Optional;

@Repository 
// Heredamos de JpaRepository para obtener todos los métodos CRUD básicos 
// (save, findById, findAll, delete, etc.)
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Método personalizado para el CheckLoginUseCase.
     * Spring Data JPA genera automáticamente la consulta: SELECT * FROM users WHERE email = ?
     * @param email El correo electrónico a buscar.
     * @return Un Optional<User> que contiene el usuario si se encuentra.
     */
    Optional<com.example.user.entity.User> findByEmail(String email);
}