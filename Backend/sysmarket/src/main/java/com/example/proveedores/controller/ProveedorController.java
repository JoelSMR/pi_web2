package com.example.proveedores.controller;

import com.example.proveedores.entity.Proveedor;
import com.example.proveedores.service.ProveedorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1/proveedor")
public class ProveedorController {

    @Autowired
    private ProveedorService proveedorService;

    @GetMapping
    public List<Proveedor> getAll() {
        return proveedorService.getProveedor();
    }

    @GetMapping("/{proveedorId}")
    public Optional<Proveedor> getBId(@PathVariable("proveedorId") Long proveedorId) {
        return proveedorService.getProveedor(proveedorId);
    }

    @PostMapping
    public void saveOrUpdate(@RequestBody Proveedor proveedor) {
        proveedorService.saveOrUpdate(proveedor);
    }

    @DeleteMapping("/{proveedorId}")
    public void deleteById(@PathVariable("proveedorId") Long proveedorId) {
        proveedorService.delete(proveedorId);
    }
}