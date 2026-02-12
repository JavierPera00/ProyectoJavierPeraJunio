package com.ProyectoJunio.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "comentarios")
public class Comentario {

	 	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @Column(length = 500)
	    private String texto;

	    private LocalDateTime fecha = LocalDateTime.now();

	    @ManyToOne
	    @JoinColumn(name = "usuario_id")
	    private Usuario usuario;

	    public Comentario() {}

	    public Comentario(String texto, Usuario usuario) {
	        this.texto = texto;
	        this.usuario = usuario;
	    }

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getTexto() {
			return texto;
		}

		public void setTexto(String texto) {
			this.texto = texto;
		}

		public LocalDateTime getFecha() {
			return fecha;
		}

		public void setFecha(LocalDateTime fecha) {
			this.fecha = fecha;
		}

		public Usuario getUsuario() {
			return usuario;
		}

		public void setUsuario(Usuario usuario) {
			this.usuario = usuario;
		}

		@Override
		public String toString() {
			return "Comentario [id=" + id + ", texto=" + texto + ", fecha=" + fecha + ", usuario=" + usuario + "]";
		}
}
