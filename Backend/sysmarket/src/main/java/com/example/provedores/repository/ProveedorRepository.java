package com.example.proveedores.repository;

import com.example.proveedor.entity.Proveedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public class ProveedorRepository extends JpaRespository<Proveedor, Long> {
    
}
