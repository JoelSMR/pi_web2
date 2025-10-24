package com.example.proveedores.controller;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.util.UriComponentsBuilder;

import com.example.proveedores.entity.Proveedor;
import com.example.proveedores.service.ProveedorServicio;

@RestController
@RequestMapping("/api/proveedores")
public class ProveedorControlador {

    private final ProveedorServicio servicio;

    public ProveedorControlador(ProveedorServicio servicio) {
        this.servicio = servicio;
    }

    // GET /api/proveedores - Listar todos
    @GetMapping
    public List<Proveedor> listar() {
        return servicio.listarTodos();
    }

    // GET /api/proveedores/{id} - Obtener por id
    @GetMapping("/{id}")
    public ResponseEntity<Proveedor> obtener(@PathVariable Long id) {
        return servicio.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/proveedores - Crear
    @PostMapping
    public ResponseEntity<Proveedor> crear(@RequestBody Proveedor proveedor,
                                           UriComponentsBuilder uriBuilder) {
        Proveedor creado = servicio.crear(proveedor);
        URI ubicacion = uriBuilder
                .path("/api/proveedores/{id}")
                .buildAndExpand(creado.getIdProveedor())
                .toUri();
        return ResponseEntity.created(ubicacion).body(creado);
    }

    // PUT /api/proveedores/{id} - Actualizar
    @PutMapping("/{id}")
    public ResponseEntity<Proveedor> actualizar(@PathVariable Long id,
                                                @RequestBody Proveedor proveedor) {
        return servicio.actualizar(id, proveedor)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE /api/proveedores/{id} - Eliminar
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        boolean eliminado = servicio.eliminar(id);
        return eliminado ? ResponseEntity.noContent().build()
                         : ResponseEntity.notFound().build();
    }
}