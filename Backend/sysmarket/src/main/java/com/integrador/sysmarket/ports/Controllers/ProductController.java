package com.integrador.sysmarket.ports.Controllers;


import org.springframework.web.bind.annotation.RestController;

import com.integrador.sysmarket.domain.entities.DTOs.ProductoDTO;
import com.integrador.sysmarket.domain.mappers.Producto.ProductoMapper;

import com.integrador.sysmarket.service.implement.ProductoServiceImplement;


import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;





@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ProductController {
    
    private final ProductoServiceImplement service;

    @GetMapping("/")
    public String getMethodName() {
        return "aaa";
    }
    

    @GetMapping("/getOneProduct")
    public ProductoDTO getOneProduct(){
        return ProductoMapper.EntityToDTO(service.fetchOneProduct());
        
       

    }
}
