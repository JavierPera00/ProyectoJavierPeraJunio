package com.ProyectoJunio.servicio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ProyectoJunio.model.Contacto;
import com.ProyectoJunio.repository.ContactoRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ContactoServiceImpl implements ContactoService {

    @Autowired
    private ContactoRepository repo;

    @Override
    public Contacto guardar(Contacto c) {
        return repo.save(c);
    }

    @Override
    public List<Contacto> listar() {
        return repo.findAll();
    }

    @Override
    public Contacto buscarPorId(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public void eliminar(Long id) {
        repo.deleteById(id);
    }
}