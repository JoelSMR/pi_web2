package com.integrador.sysmarket.domain.entities;

import com.integrador.sysmarket.domain.enums.EnCategorias;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "productos")
@NoArgsConstructor @AllArgsConstructor @Data  @Builder
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="precio",nullable = false)
    private float precio;

    @Column(name="nombre",nullable = false)
    private String nombre;

    @Column(name="descripcion",nullable = false)
    private String descripcion;
    
    @Column(name="categoria",nullable = false)
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private EnCategorias categoria= EnCategorias.NoQuimico;

// MUCHOS productos -> UN proveedor  
    @ManyToOne(fetch = FetchType.LAZY, optional = false)  
    @JoinColumn(name = "proveedor_id", nullable = false,  
                foreignKey = @ForeignKey(name = "fk_producto_proveedor"))  
    @ToString.Exclude  
    private Proveedor proveedor;
}
