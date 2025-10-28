package com.example.user.controller;

import java.net.URI;
import java.util.Collections;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import com.example.user.entity.User;
import com.example.user.service.UserCrudUseCase;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserCrudUseCase service;

    public UserController(UserCrudUseCase service) {
        this.service = service;
    }

    // GET /api/v1/user -> listar todos
    @GetMapping
    public List<User> list() {
        return service.findAll();
    }

    // GET /api/v1/user/{id} -> obtener por id
    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/v1/user -> crear y devolver con id generado
    @PostMapping
    public ResponseEntity<User> create(@RequestBody User user, UriComponentsBuilder uriBuilder) {
        User created = service.create(user);
        URI location = uriBuilder.path("/api/v1/user/{id}")
                .buildAndExpand(created.getId())
                .toUri();
        return ResponseEntity.created(location).body(created);
    }

    // PUT /api/v1/user/{id} -> actualizar
    @PutMapping("/{id}")
    public ResponseEntity<User> update(@PathVariable Long id, @RequestBody User user) {
        return service.update(id, user)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE /api/v1/user/{id} -> eliminar
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        boolean deleted = service.delete(id);
        return deleted ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }

    @RestController
    public class AuthController {

        private final UserCrudUseCase service;

        public AuthController(UserCrudUseCase service) {
            this.service = service;
        }

        @PostMapping("/checklogin")
        public ResponseEntity<?> checklogin(@RequestBody User body) {
            boolean ok = service.checkLogin(body.getCorreo(), body.getNombre());
            return ok
                    ? ResponseEntity.ok(Collections.singletonMap("authenticated", true))
                    : ResponseEntity.status(401).body(Collections.singletonMap("authenticated", false));
        }
    }
}