package com.example.proveedores.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.proveedores.entity.Proveedor;
import java.util.Optional;

@Repository
public interface ProveedorRepository extends JpaRepository<Proveedor, Long> {
    
    // Métodos de consulta personalizados
    Optional<Proveedor> findByRuc(String ruc);
    
    boolean existsByRuc(String ruc);
    
    boolean existsByEmail(String email);
}