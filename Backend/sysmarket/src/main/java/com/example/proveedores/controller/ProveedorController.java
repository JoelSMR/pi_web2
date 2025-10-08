package com.example.proveedores.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uk.co.xprl.efactura.Proveedor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.example.springframework.proveedorService.*;

@RestController
@RequestMapping(path = "api/v1/proveedor")
public class ProveedorController<proveedorService> {

    @Autowired
    private proveedorService proveedorService;

    @GetMapping
    public List<Proveedor> getAll() {
        return proveedorService.getProveedor();
    }

    @GetMapping("/{proveedorId}")
    public Optional <Proveedor> getBId (@PathVariable ("proveedorId") Long proveedorId) {
        return proveedorService.getProveedor(proveedorId);
    }

    @PostMapping
    public void saveOrUpdate(@RequestBody Proveedor proveedor) {
        proveedorService.saveOrUpdate(proveedor);
    }

    @DeleteMapping("/{proveedorId}")
    public void saveOrUpdate(@PathVariable("proveedorId") Long proveedorId) {
        proveedorService.delete(proveedorId);
    }
}
