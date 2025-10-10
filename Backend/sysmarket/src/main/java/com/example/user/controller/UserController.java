package com.example.user.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.user.entity.User;
import com.example.user.service.CheckLoginUseCase;
import com.example.user.service.CreateUserUseCase;
import com.example.user.service.DeleteUserUseCase;
import com.example.user.service.RetrieveAllUsersUseCase;
import com.example.user.service.UpdateUserUseCase;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1/user") 
public class UserController {

    // 1. DECLARACIÓN DE USECASES
    private final CreateUserUseCase createUserUseCase;
    private final RetrieveAllUsersUseCase retrieveAllUsersUseCase;
    private final UpdateUserUseCase updateUserUseCase;
    private final DeleteUserUseCase deleteUserUseCase;
    private final CheckLoginUseCase checkLoginUseCase; // Caso de uso especial

    // 2. INYECCIÓN DE USECASES 
    public UserController(
        CreateUserUseCase createUserUseCase,
        RetrieveAllUsersUseCase retrieveAllUsersUseCase,
        UpdateUserUseCase updateUserUseCase,
        DeleteUserUseCase deleteUserUseCase,
        CheckLoginUseCase checkLoginUseCase) {
        
        this.createUserUseCase = createUserUseCase;
        this.retrieveAllUsersUseCase = retrieveAllUsersUseCase;
        this.updateUserUseCase = updateUserUseCase;
        this.deleteUserUseCase = deleteUserUseCase;
        this.checkLoginUseCase = checkLoginUseCase;
    }

    // --- ENDPOINTS CRUD ---

    @PostMapping // POST /usuarios
    public ResponseEntity<User> create(@RequestBody User user) {
        try {
            User createdUser = createUserUseCase.execute(user);
            // Retorna 201 Created y el objeto del usuario creado
            return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            // Manejo simple para el ejemplo de email duplicado
            return new ResponseEntity<>(HttpStatus.CONFLICT); // 409 Conflict
        }
    }

    @GetMapping // GET /usuarios
    public ResponseEntity<List<User>> getAll() {
        List<User> users = retrieveAllUsersUseCase.execute();
        return ResponseEntity.ok(users); // Retorna 200 OK
    }

    @PutMapping("/{id}") // PUT /usuarios/{id}
    public ResponseEntity<User> update(@PathVariable Long id, @RequestBody User userDetails) {
        // Aseguramos que el ID del path esté en el objeto para el UseCase
        userDetails.setId(id); 
        
        Optional<User> updatedUser = updateUserUseCase.execute(userDetails);
        
        // Retorna 200 OK si existe, 404 Not Found si no
        return updatedUser
            .map(user -> new ResponseEntity<>(user, HttpStatus.OK))
            .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}") // DELETE /usuarios/{id}
    @ResponseStatus(HttpStatus.NO_CONTENT) // Retorna 204 No Content
    public void delete(@PathVariable Long id) {
        deleteUserUseCase.execute(id);
    }

    // --- ENDPOINT ESPECIAL DE LOGIN ---

    // Definición de un DTO simple para recibir credenciales en el request
    public static class LoginRequest {
        public String email;
        public String password;
    }

    @PostMapping("/login") // POST /usuarios/login
    public ResponseEntity<Boolean> checkLogin(@RequestBody LoginRequest loginRequest) {
        
        boolean isValid = checkLoginUseCase.check(
            loginRequest.email, 
            loginRequest.password
        );
        
        // Retorna 200 OK y el valor booleano
        return new ResponseEntity<>(isValid, HttpStatus.OK);
    }
}