package com.ProyectoJunio.servicio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ProyectoJunio.model.Noticia;
import com.ProyectoJunio.repository.NoticiaRepository;

@Service
public class NoticiaService {

	 	@Autowired
	    private NoticiaRepository noticiaRepository;

	    public List<Noticia> findAll() {
	        return noticiaRepository.findAll();
	    }

	    public Noticia findById(Long id) {
	        return noticiaRepository.findById(id).orElse(null);
	    }

	    public Noticia save(Noticia noticia) {
	        return noticiaRepository.save(noticia);
	    }

	    public void delete(Long id) {
	        noticiaRepository.deleteById(id);
	    }

	    public List<Noticia> ultimasNoticias() {
	        return noticiaRepository.findTop10ByOrderByFechaPublicacionDesc();
	    }

	    public List<Noticia> noticiasPorCiudad(String ciudad) {
	        return noticiaRepository.findByCiudadIgnoreCase(ciudad);
	    }
}
