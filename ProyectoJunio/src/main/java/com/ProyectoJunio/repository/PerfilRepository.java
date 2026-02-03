package com.ProyectoJunio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ProyectoJunio.model.Perfil;

@Repository
public interface PerfilRepository extends JpaRepository<Perfil, Long> {
    // Métodos personalizados opcionales
}
