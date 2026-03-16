package com.ProyectoJunio.servicio;

import java.util.List;
import com.ProyectoJunio.model.Rol;

public interface RolService {

    public List<Rol> findAll();

    public Rol findById(Long id);

    public Rol save(Rol rol);

    public void delete(Long id);
}