package com.ProyectoJunio.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "cursos")
public class Curso {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    @Column(columnDefinition = "TEXT")
    private String descripcion;
    private String duracion; 
    private String imagenUrl;
    @Column(columnDefinition = "TEXT")
    private String url;
    
    public Curso() {}


    public Curso(String titulo, String descripcion, String duracion, String imagen,String url) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.duracion = duracion;
        this.imagenUrl = imagen;
        this.url = url;
    }
    
    
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTitulo() {
		return titulo;
	}
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	public String getDuracion() {
		return duracion;
	}
	public void setDuracion(String duracion) {
		this.duracion = duracion;
	}
	public String getImagenUrl() {
		return imagenUrl;
	}
	public void setImagenUrl(String imagenUrl) {
		this.imagenUrl = imagenUrl;
	}


	@Override
	public String toString() {
		return "Curso [id=" + id + ", titulo=" + titulo + ", descripcion=" + descripcion + ", duracion=" + duracion
				+ ", imagenUrl=" + imagenUrl + ", url=" + url + "]";
	}
}
