package com.example.proveedores.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.proveedores.entity.Proveedor;
import com.example.proveedores.repository.ProveedorRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProveedorService {
    
    @Autowired
    private ProveedorRepository proveedorRepository;

    // Obtener todos los proveedores
    public List<Proveedor> getAllProveedores() {
        return proveedorRepository.findAll();
    }

    // Obtener proveedor por ID
    public Optional<Proveedor> getProveedorById(Long id) {
        return proveedorRepository.findById(id);
    }

    // Crear nuevo proveedor
    @Transactional
    public Proveedor createProveedor(Proveedor proveedor) {
        // Validar que el RUC no exista
        if (proveedorRepository.existsByRuc(proveedor.getRuc())) {
            throw new IllegalArgumentException("Ya existe un proveedor con el RUC: " + proveedor.getRuc());
        }
        
        // Validar email único (si se proporciona)
        if (proveedor.getEmail() != null && proveedorRepository.existsByEmail(proveedor.getEmail())) {
            throw new IllegalArgumentException("El email ya está registrado");
        }
        
        return proveedorRepository.save(proveedor);
    }

    // Actualizar proveedor existente
    @Transactional
    public Proveedor updateProveedor(Long id, Proveedor proveedorActualizado) {
        Proveedor proveedorExistente = proveedorRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Proveedor no encontrado con ID: " + id));
        
        // Validar RUC único (si cambió)
        if (!proveedorExistente.getRuc().equals(proveedorActualizado.getRuc()) 
            && proveedorRepository.existsByRuc(proveedorActualizado.getRuc())) {
            throw new IllegalArgumentException("El RUC ya está registrado");
        }
        
        // Actualizar campos
        proveedorExistente.setNombre(proveedorActualizado.getNombre());
        proveedorExistente.setRuc(proveedorActualizado.getRuc());
        proveedorExistente.setTelefono(proveedorActualizado.getTelefono());
        proveedorExistente.setEmail(proveedorActualizado.getEmail());
        proveedorExistente.setDireccion(proveedorActualizado.getDireccion());
        
        return proveedorRepository.save(proveedorExistente);
    }

    // Eliminar proveedor
    @Transactional
    public void deleteProveedor(Long id) {
        if (!proveedorRepository.existsById(id)) {
            throw new IllegalArgumentException("Proveedor no encontrado con ID: " + id);
        }
        proveedorRepository.deleteById(id);
    }
}