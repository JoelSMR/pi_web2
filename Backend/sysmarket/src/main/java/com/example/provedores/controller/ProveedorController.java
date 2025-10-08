package com.example.proveedores.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping(path = "api/v1/proveedor")
public class ProveedorController {

    @Autowired
    private proveedorService proveedorService;

    @GetMapping
    public List<proveedor> getAll() {
        return proveedorService.getProveedor();
    }

    @GetMapping("/{proveedorId}")
    public Optional <Proveedor> getBId (@PathVariable ("proveedorId") Long proveedorId) {
        return proveedorService.getProveedor(proveedorId);
    }

    @PostMapping
    public void saveOrUpdate(@RequestBody proveedor proveedor) {
        proveedorService.saveOrUpdate(proveedor);
    }

    @DeleteMapping("/{proveedorId}")
    public void saveOrUpdate(@PathVariable("proveedorId") Long proveedorId) {
        proveedorService.delete(proveedorId);
    }
}
