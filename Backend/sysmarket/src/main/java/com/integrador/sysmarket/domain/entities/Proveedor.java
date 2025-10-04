package com.integrador.sysmarket.domain.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name="proveedores")
@Builder
@NoArgsConstructor @AllArgsConstructor
@Data
public class Proveedor {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;
    
    
    @OneToMany(mappedBy = "proveedor",fetch = FetchType.LAZY,cascade = CascadeType.ALL,orphanRemoval = false)
    @Builder.Default
    @ToString.Exclude @EqualsAndHashCode.Exclude
    private List<Producto> productoId = new ArrayList<Producto>();
}
