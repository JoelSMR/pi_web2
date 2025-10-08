package com.example.proveedores.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.proveedores.entity.Proveedor;
import com.example.proveedores.repository.ProveedorRepository;
import java.util.List;
import java.util.Optional;

@Service
public class ProveedorService {
    @Autowired
    ProveedorRepository proveedorRepository;

    public List<Proveedor> getProveedor(){
        return proveedorRepository.findAll();
    }

    public Optional<Proveedor> getProveedor(Long id){
       return proveedorRepository.findById(id);
    }

    public void saveOrUpdate (Proveedor proveedor) {
        proveedorRepository.save(proveedor);
    }

    public void delete(Long id) {
        proveedorRepository.deleteById(id);
    }
}
