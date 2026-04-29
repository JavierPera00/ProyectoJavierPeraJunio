package com.ProyectoJunio.servicio;

import java.util.List;
import com.ProyectoJunio.model.Contacto;

public interface ContactoService {

    Contacto guardar(Contacto c);

    List<Contacto> listar();

    Contacto buscarPorId(Long id);

    void eliminar(Long id);
}