package com.example.proveedores.entity;

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

}
