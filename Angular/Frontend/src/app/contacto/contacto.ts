import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { ContactoService } from '../services/contacto-service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-contacto',
  imports: [CommonModule,FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
  encapsulation: ViewEncapsulation.None
})
export class Contacto {
  messageSent = false;

  contacto = {
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  };

  constructor(private contactoService: ContactoService) {}

  submitForm() {
    this.contactoService.enviarContacto(this.contacto).subscribe({
      next: () => {
        this.messageSent = true;

        setTimeout(() => {
          this.messageSent = false;
          this.contacto = {
            nombre: '',
            email: '',
            asunto: '',
            mensaje: ''
          };
        }, 3000);
      },
      error: (err) => {
        console.error('Error enviando mensaje', err);
      }
    });
  }
}
