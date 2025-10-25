package com.example.user.controller;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import com.example.user.entity.User;
import com.example.user.service.UserCrudUseCase;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserCrudUseCase service;

    public UserController(UserCrudUseCase service) {
        this.service = service;
    }

    // GET /api/users - listar todos
    @GetMapping
    public List<User> list() {
        return service.findAll();
    }

    // GET /api/users/{id} - obtener por id
    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/users - crear (retorna el usuario con ID generado)
    @PostMapping
    public ResponseEntity<User> create(@RequestBody User user, UriComponentsBuilder uriBuilder) {
        User created = service.create(user); // aquí ya tiene ID
        URI location = uriBuilder.path("/api/users/{id}")
                                 .buildAndExpand(created.getId())
                                 .toUri();
        return ResponseEntity.created(location).body(created);
    }

    // PUT /api/users/{id} - actualizar
    @PutMapping("/{id}")
    public ResponseEntity<User> update(@PathVariable Long id, @RequestBody User user) {
        return service.update(id, user)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE /api/users/{id} - eliminar
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        boolean deleted = service.delete(id);
        return deleted ? ResponseEntity.noContent().build()
                       : ResponseEntity.notFound().build();
    }
}