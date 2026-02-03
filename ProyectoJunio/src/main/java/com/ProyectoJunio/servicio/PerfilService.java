package com.ProyectoJunio.servicio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ProyectoJunio.model.Perfil;
import com.ProyectoJunio.repository.PerfilRepository;

@Service
public class PerfilService {

    @Autowired
    private PerfilRepository perfilRepository;

    public List<Perfil> findAll() {
        return perfilRepository.findAll();
    }

    public Perfil findById(Long id) {
        return perfilRepository.findById(id).orElse(null);
    }

    public Perfil save(Perfil perfil) {
        return perfilRepository.save(perfil);
    }

    public void delete(Long id) {
        perfilRepository.deleteById(id);
    }
}
