package com.example.proveedores.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.proveedores.entity.Proveedor;


@Repository
public interface ProveedorRepository extends JpaRepository<Proveedor, Long> {
    
}
