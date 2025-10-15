package com.example.proveedores.entity;

import java.util.List;

import com.example.productos.entity.Product;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "tabla_proveedor")

public class Proveedor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long proveedorId;
    private String name;
    @OneToMany(mappedBy = "proveedor", cascade = CascadeType.ALL)
    private List<Product> productos;

}
