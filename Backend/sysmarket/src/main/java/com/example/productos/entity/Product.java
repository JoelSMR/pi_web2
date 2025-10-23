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
    private Long productId; //id product
    private Double price; //price product
    private String name; //name product
    private String description; //description product
    private String category; //category product

    @ManyToOne
    @JoinColumn(name = "proveedorId") 
    private Proveedor proveedor;

}
