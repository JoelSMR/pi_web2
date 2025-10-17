package com.example.user.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

// Usaremos Jakarta Persistence API (para Spring Boot 3+)

@Entity
@Table(name = "users") // Mapea esta clase a la tabla 'users' en la base de datos
public class User {

    @Id // Marca este campo como la clave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Indica que la BD genera el valor (autoincremental)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false) // Asegura que el email sea único y no nulo
    private String email;

    @Column(nullable = false)
    private String password; // NOTA: Aquí se almacenará el HASH de la contraseña en una app real

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    // Constructor por defecto, requerido por JPA
    public User() {
    }

    // Constructor para la creación (sin ID, ya que es autogenerado)
    public User(String name, String email, String password, Role role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() { // <<-- NUEVO GETTER
        return role;
    }

    public void setRole(Role role) { // <<-- NUEVO SETTER
        this.role = role;
    }
}