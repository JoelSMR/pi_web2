package com.example.proveedores.entity;

import java.util.List;
import com.example.productos.entity.Product;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Entity
@Table(name = "tabla_proveedor")
public class Proveedor {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long proveedorId;
    
    @NotBlank(message = "El nombre es obligatorio")
    @Column(nullable = false)
    private String nombre;
    
    @NotBlank(message = "El RUC/NIT es obligatorio")
    @Column(unique = true, nullable = false)
    private String ruc;
    
    @Column(length = 20)
    private String telefono;
    
    @Email(message = "Email debe ser válido")
    @Column(unique = true)
    private String email;
    
    @Column(length = 255)
    private String direccion;
    
    @OneToMany(mappedBy = "proveedor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Product> productos;
}