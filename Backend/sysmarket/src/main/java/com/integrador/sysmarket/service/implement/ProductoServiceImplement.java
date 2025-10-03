package com.integrador.sysmarket.service.implement;

import org.springframework.stereotype.Service;

import com.integrador.sysmarket.domain.entities.Producto;
import com.integrador.sysmarket.domain.entities.repository.IProductoRepository;
import com.integrador.sysmarket.service.ProductoService;


import lombok.RequiredArgsConstructor;



@Service
@RequiredArgsConstructor 
public class ProductoServiceImplement implements ProductoService{
    
    private final IProductoRepository productoRepository;

    @Override
    public Producto fetchOneProduct(){
         return productoRepository.traerUnProducto();
    }
}
