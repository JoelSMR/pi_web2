package com.integrador.sysmarket.domain.mappers.Producto;

import com.integrador.sysmarket.domain.entities.Producto;
import com.integrador.sysmarket.domain.entities.DTOs.ProductoDTO;

public class ProductoMapper {
    public static ProductoDTO EntityToDTO(Producto p){
        if(p==null)return ProductoDTO.builder().build();
        return ProductoDTO.builder()
                            .id(p.getId())
                            .categoria(p.getCategoria().name())
                            .descripcion(p.getDescripcion())
                            .build();
    }
}
