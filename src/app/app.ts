import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent, Footer } from './ui/components/';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'portfolio';
}
