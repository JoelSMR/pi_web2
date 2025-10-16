package com.example.user.service;

import org.springframework.stereotype.Service;

import com.example.user.entity.User;
import com.example.user.repository.UserRepository;

import java.util.List;
import java.util.Optional;

// Usamos @Service para que Spring gestione esta clase y permita la inyección.
@Service
public class UserCrudUseCase {

    // Única dependencia: la interfaz del Repositorio
    private final UserRepository userRepository;

    // Inyección de dependencia por constructor
    public UserCrudUseCase(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // =======================================================
    // 1. CREATE (Crear Usuario)
    // =======================================================

    /**
     * Lógica para crear y guardar un nuevo usuario.
     */
    public User create(User user) {
        // Validación de negocio: Evitar emails duplicados
        Optional<User> existingUser = Optional.empty();
        if (existingUser.isPresent()) {
            throw new RuntimeException("El email " + user.getEmail() + " ya está registrado.");
        }

        // NOTA: Implementar el cifrado de la contraseña (Hashing) aquí en un proyecto
        // real.

        return userRepository.save(user);
    }

    // =======================================================
    // 2. RETRIEVE ALL (Listar Usuarios)
    // =======================================================

    /**
     * Recupera todos los usuarios.
     */
    public List<User> findAll() {
        return userRepository.findAll();
    }

    // =======================================================
    // 3. RETRIEVE BY ID (Buscar por ID - Útil para el controlador)
    // =======================================================

    /**
     * Busca un usuario por su ID.
     */
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    // =======================================================
    // 4. UPDATE (Actualizar Usuario)
    // =======================================================

    /**
     * Actualiza un usuario existente.
     */
    public Optional<User> update(User user) {
        if (user.getId() == null) {
            return Optional.empty(); // No se puede actualizar sin ID
        }

        // 1. Verificar si el usuario existe antes de actualizar
        Optional<User> existingUser = userRepository.findById(user.getId());

        if (existingUser.isPresent()) {
            // NOTA: Se recomienda copiar solo los campos que se permiten actualizar
            // para evitar sobrescribir accidentalmente la contraseña u otros campos.

            // Si el objeto User entrante ya tiene el ID, save() realizará un UPDATE.
            User updatedUser = userRepository.save(user);
            return Optional.of(updatedUser);
        }

        return Optional.empty();
    }

    // =======================================================
    // 5. DELETE (Eliminar Usuario)
    // =======================================================

    /**
     * Elimina un usuario por su ID.
     */
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    // =======================================================
    // 6. CASO DE USO ESPECIAL: CHECK LOGIN
    // =======================================================

    /**
     * Lógica de negocio para verificar el login.
     */
    public boolean checkLogin(String email, String password) {

        // 1. Buscar al usuario por email
        // CON la llamada real a la base de datos
        Optional<User> userOptional = userRepository.findByEmail(email);

        // 2. Si el usuario existe, verificar la contraseña
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return user.getPassword().equals(password);
        }
        // 3. Si el usuario no existe, retornar false
        return false;
    }
}