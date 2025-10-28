package com.example.user.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.user.entity.User;
import com.example.user.repository.UserRepository;

@Service
public class UserCrudUseCase {

    private final UserRepository repository;

    public UserCrudUseCase(UserRepository repository) {
        this.repository = repository;
    }

    // CREATE - retorna el usuario creado con el ID generado
    public User create(User user) {
        user.setId(null); // asegurar que se cree uno nuevo
        return repository.save(user); // aquí se genera el ID
    }

    // READ - listar todos
    public List<User> findAll() {
        return repository.findAll();
    }

    // READ - por id
    public Optional<User> findById(Long id) {
        return repository.findById(id);
    }

    // UPDATE
    public Optional<User> update(Long id, User data) {
        return repository.findById(id).map(existing -> {
            existing.setNombre(data.getNombre());
            existing.setCorreo(data.getCorreo());
            return repository.save(existing);
        });
    }

    // DELETE
    public boolean delete(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    public boolean checkLogin(String correo, String nombre) {
        return repository.findByCorreo(correo)
                .map(u -> nombre != null && nombre.equals(u.getNombre()))
                .orElse(false);
    }
}