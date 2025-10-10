package com.example.user.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.user.entity.User;
import com.example.user.service.UserCrudUseCase;

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

    // --- ENDPOINTS CRUD ---

    @PostMapping // POST /usuarios
    public ResponseEntity<User> create(@RequestBody User user) {
        try {
            // Llama al método CREATE del UseCase
            User createdUser = userCrudUseCase.create(user);
            return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            // Manejo simple para el ejemplo de email duplicado
            return new ResponseEntity<>(HttpStatus.CONFLICT); // 409 Conflict
        }
    }

    @GetMapping // GET /usuarios
    public ResponseEntity<List<User>> getAll() {
        // Llama al método FIND ALL del UseCase
        List<User> users = userCrudUseCase.findAll();
        return ResponseEntity.ok(users); // Retorna 200 OK
    }

    @PutMapping("/{id}") // PUT /usuarios/{id}
    public ResponseEntity<User> update(@PathVariable Long id, @RequestBody User userDetails) {
        userDetails.setId(id); 
        
        // Llama al método UPDATE del UseCase
        Optional<User> updatedUser = userCrudUseCase.update(userDetails);
        
        // Retorna 200 OK si existe, 404 Not Found si no
        return updatedUser
            .map(user -> new ResponseEntity<>(user, HttpStatus.OK))
            .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}") // DELETE /usuarios/{id}
    @ResponseStatus(HttpStatus.NO_CONTENT) // Retorna 204 No Content
    public void delete(@PathVariable Long id) {
        // Llama al método DELETE del UseCase
        userCrudUseCase.deleteById(id);
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