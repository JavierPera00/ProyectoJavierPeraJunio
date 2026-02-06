package com.ProyectoJunio.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ProyectoJunio.model.Noticia;

@Repository
public interface NoticiaRepository extends JpaRepository<Noticia, Long> {

	// Noticias más recientes
    List<Noticia> findTop10ByOrderByFechaPublicacionDesc();

 
}
