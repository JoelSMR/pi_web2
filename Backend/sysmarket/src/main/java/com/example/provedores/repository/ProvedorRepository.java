package com.example.provedores.repository;

import com.example.provedor.entity.Provedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public class ProvedorRepository extends JpaRespository<Provedor, Long> {
    
}
