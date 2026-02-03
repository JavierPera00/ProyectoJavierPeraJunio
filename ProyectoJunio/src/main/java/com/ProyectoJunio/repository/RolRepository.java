package com.ProyectoJunio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ProyectoJunio.model.Rol;

@Repository
public interface RolRepository extends JpaRepository<Rol, Long> {
    // Métodos personalizados opcionales
}