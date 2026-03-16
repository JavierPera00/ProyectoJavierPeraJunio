package com.ProyectoJunio.servicio;

import java.util.List;

import com.ProyectoJunio.model.Curso;


public interface CursoService {

	public List<Curso> findAll();

    public Curso findById(Long id);

    public Curso save(Curso curso);

    public void delete(Long id);
    
    public List<Curso> findByTitulo(String titulo);
}
