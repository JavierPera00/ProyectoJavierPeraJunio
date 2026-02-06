import { Component, signal } from '@angular/core';
import { Home } from './home/home';
import { RouterLink, RouterLinkWithHref, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('Frontend');

  
}
