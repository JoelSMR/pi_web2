package com.example.user.controller; // PAQUETE AJUSTADO

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.user.entity.User;
import com.example.user.service.UserService;

import java.util.List;
import java.util.Optional;

// Controller of the CRUD of the user
@RestController
@RequestMapping("/api/v1/users") 
public class UserController {

    @Autowired
    private UserService userService;


    @PostMapping
    public ResponseEntity<User> saveNewUser(@RequestBody User user) {
        User newUser = userService.saveOrUpdate(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

 
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.getUserById(id);
        
        return user.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.notFound().build());
    }
    

    @PutMapping
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        if (user.getId() == null || userService.getUserById(user.getId()).isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        User updatedUser = userService.saveOrUpdate(user);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
