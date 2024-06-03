import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContainerTemplate } from './templates/ContainerTemplate/ContainerTemplate.component';
import { Navigator } from './components/Navigator/navigator.component';
import { FooterContent } from './components/FooterContent/FooterContent.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ContainerTemplate,
    Navigator,
    FooterContent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'item-register';
}
