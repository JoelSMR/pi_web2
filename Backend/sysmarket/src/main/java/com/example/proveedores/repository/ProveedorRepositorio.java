package com.example.proveedores.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.proveedores.entity.Proveedor;

public interface ProveedorRepositorio extends JpaRepository<Proveedor, Long> {
    // CRUD básico ya disponible por JpaRepository
}