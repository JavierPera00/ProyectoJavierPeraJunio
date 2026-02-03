package com.ProyectoJunio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ProyectoJunio.model.Perfil;
import com.ProyectoJunio.servicio.PerfilService;

@RestController
@RequestMapping("/api/perfiles")
@CrossOrigin(origins = "*")
public class PerfilController {

    @Autowired
    private PerfilService perfilService;

 // GET todas las perfiles
    @GetMapping
    public ResponseEntity<List<Perfil>> getAll() {
        return ResponseEntity.ok(perfilService.findAll());
    }

    // GET perfil por ID
    @GetMapping("/{id}")
    public ResponseEntity<Perfil> getById(@PathVariable Long id) {
        Perfil perfil = perfilService.findById(id);
        if (perfil == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(perfil);
    }

    // POST crear nuevo perfil
    @PostMapping
    public ResponseEntity<Perfil> create(@RequestBody Perfil perfil) {
        return ResponseEntity.ok(perfilService.save(perfil));
    }

    // PUT actualizar perfil
    @PutMapping("/{id}")
    public ResponseEntity<Perfil> update(@PathVariable Long id, @RequestBody Perfil perfil) {
        Perfil existing = perfilService.findById(id);
        if (existing == null) return ResponseEntity.notFound().build();

        // Actualizamos los campos según tu modelo actual
        existing.setCorreo(perfil.getCorreo());
        existing.setContraseña(perfil.getContraseña());
        existing.setBio(perfil.getBio());
        existing.setUsuario(perfil.getUsuario());

        return ResponseEntity.ok(perfilService.save(existing));
    }

    // DELETE eliminar perfil
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        perfilService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
