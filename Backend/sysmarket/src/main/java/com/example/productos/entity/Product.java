package com.example.productos.entity;


import com.example.proveedores.entity.Proveedor;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "tbl_product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;
    private Double price;
    private String name;
    private String description;
    private String category;

    @ManyToOne
    @JoinColumn(name = "proveedor_id") // nombre de la columna FK en la BD
    private Proveedor proveedor;

}
