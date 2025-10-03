package com.integrador.sysmarket.domain.entities.DTOs;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductoDTO {
    private Long id;
    private float precio;
    private String nombre;
    private String descripcion;
    private String categoria;
    private Long proveedorId;
}
