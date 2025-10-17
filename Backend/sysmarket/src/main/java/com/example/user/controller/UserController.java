package com.example.user.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.user.entity.User;
import com.example.user.service.UserCrudUseCase;
import com.example.user.entity.Role;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1/user") 
public class UserController {

    // Única inyección necesaria: el UseCase consolidado
    private final UserCrudUseCase userCrudUseCase;

    // Inyección a través del constructor
    public UserController(UserCrudUseCase userCrudUseCase) {
        this.userCrudUseCase = userCrudUseCase;
    }

    @PostMapping 
    public ResponseEntity<User> create(@RequestHeader("X-User-Email") String authEmail, @RequestBody User user) { // <<-- RECIBE HEADER
        // 1. Verificar Permiso: Solo EDITOR o ADMIN pueden crear
        if (!userCrudUseCase.hasPermission(authEmail, Role.EDITOR)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN); // 403 Forbidden
        }

        // 2. Ejecutar la lógica de creación si tiene permiso
        try {
            // Al crear un nuevo usuario, por defecto le asignamos el rol VIEWER
            user.setRole(Role.VIEWER); 
            User createdUser = userCrudUseCase.create(user);
            return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT); 
        }
    }

    // 2. GET ALL (Requiere VIEWER, EDITOR o ADMIN)
    @GetMapping 
    public ResponseEntity<List<User>> getAll(@RequestHeader("X-User-Email") String authEmail) { // <<-- RECIBE HEADER
        // 1. Verificar Permiso: Cualquier rol (VIEWER o superior) puede leer
        if (!userCrudUseCase.hasPermission(authEmail, Role.VIEWER)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN); // 403 Forbidden
        }

        // 2. Ejecutar la lógica de lectura si tiene permiso
        List<User> users = userCrudUseCase.findAll();
        return ResponseEntity.ok(users); 
    }

    // 3. UPDATE (Requiere EDITOR o ADMIN)
    @PutMapping("/{id}") 
    public ResponseEntity<User> update(@RequestHeader("X-User-Email") String authEmail, @PathVariable Long id, @RequestBody User userDetails) {
        // 1. Verificar Permiso: Solo EDITOR o ADMIN pueden actualizar
        if (!userCrudUseCase.hasPermission(authEmail, Role.EDITOR)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN); // 403 Forbidden
        }

        // 2. Ejecutar la lógica de actualización
        userDetails.setId(id); 
        Optional<User> updatedUser = userCrudUseCase.update(userDetails);
        
        return updatedUser
            .map(user -> new ResponseEntity<>(user, HttpStatus.OK))
            .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // 4. DELETE (Requiere solo ADMIN)
    @DeleteMapping("/{id}") 
    @ResponseStatus(HttpStatus.NO_CONTENT) 
    public ResponseEntity<Void> delete(@RequestHeader("X-User-Email") String authEmail, @PathVariable Long id) {
        // 1. Verificar Permiso: Solo ADMIN puede eliminar
        if (!userCrudUseCase.hasPermission(authEmail, Role.ADMIN)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN); // 403 Forbidden
        }

        // 2. Ejecutar la lógica de eliminación
        userCrudUseCase.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // --- ENDPOINT ESPECIAL DE LOGIN ---

    // Definición de un DTO simple para recibir credenciales en el request
    public static class LoginRequest {
        public String email;
        public String password;
    }

    @PostMapping("/login") // POST /usuarios/login
    public ResponseEntity<Boolean> checkLogin(@RequestBody LoginRequest loginRequest) {
        
        // Llama al método CHECK LOGIN del UseCase
        boolean isValid = userCrudUseCase.checkLogin(
            loginRequest.email, 
            loginRequest.password
        );
        
        // Retorna 200 OK y el valor booleano
        return new ResponseEntity<>(isValid, HttpStatus.OK);
    }
}