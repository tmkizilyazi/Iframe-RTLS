import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeskComponent } from './components/desk/desk.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
  
    DeskComponent],
})
export class AppComponent {
  title = 'RTLS-iframe-interface';
}
