import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-contacto',
  imports: [CommonModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
  encapsulation: ViewEncapsulation.None
})
export class Contacto {
  messageSent = false;


  submitForm() {
    this.messageSent = true;
    setTimeout(() => {
      this.messageSent = false;
    }, 3000);
  }
}
