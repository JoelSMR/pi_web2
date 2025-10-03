package com.integrador.sysmarket.domain.entities.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.integrador.sysmarket.domain.entities.Producto;

public interface IProductoRepository extends JpaRepository<Producto,Long>{

    @Query(value = "select * from productos limit 1",nativeQuery =true)
    Producto traerUnProducto();

}
