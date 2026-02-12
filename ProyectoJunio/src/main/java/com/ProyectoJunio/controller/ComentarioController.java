package com.ProyectoJunio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ProyectoJunio.model.Comentario;
import com.ProyectoJunio.model.Usuario;
import com.ProyectoJunio.servicio.ComentarioService;
import com.ProyectoJunio.servicio.UsuarioService;

@RestController
@RequestMapping("/api/comentarios")
@CrossOrigin(origins = "*")
public class ComentarioController {
	
	@Autowired
	private ComentarioService comentarioService;
	@Autowired
	private UsuarioService usuarioService;

	  @GetMapping
	  public List<Comentario> listarComentarios() {
	      return comentarioService.getAllComentarios();
	  }

	  @PostMapping
	  public Comentario crearComentario(@RequestBody Comentario comentario) {
	      String username = comentario.getUsuario().getUsername();

	      // Buscar usuario en BBDD
	      Usuario u = usuarioService.findByUsername(username);

	      // Si no existe, crearlo temporal
	      if (u == null) {
	          u = new Usuario();
	          u.setUsername(username);
	          u = usuarioService.save(u);
	      }

	      comentario.setUsuario(u);

	      return comentarioService.guardarComentario(comentario);
	  }
}
