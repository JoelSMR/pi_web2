package com.example.proveedores.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.proveedores.entity.Proveedor;
import com.example.proveedores.repository.ProveedorRepositorio;

@Service
public class ProveedorServicio {

    private final ProveedorRepositorio repositorio;

    public ProveedorServicio(ProveedorRepositorio repositorio) {
        this.repositorio = repositorio;
    }

    // CREATE
    public Proveedor crear(Proveedor proveedor) {
        proveedor.setIdProveedor(null); // asegurar creación
        return repositorio.save(proveedor);
    }

    // READ (todos)
    public List<Proveedor> listarTodos() {
        return repositorio.findAll();
    }

    // READ (por id)
    public Optional<Proveedor> obtenerPorId(Long id) {
        return repositorio.findById(id);
    }

    // UPDATE
    public Optional<Proveedor> actualizar(Long id, Proveedor datos) {
        return repositorio.findById(id).map(existente -> {
            existente.setNombre(datos.getNombre());
            existente.setTelefono(datos.getTelefono());
            existente.setEmail(datos.getEmail());
            return repositorio.save(existente);
        });
    }

    // DELETE
    public boolean eliminar(Long id) {
        if (repositorio.existsById(id)) {
            repositorio.deleteById(id);
            return true;
        }
        return false;
    }
}