import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'Welcome to Pariksha!';
  subtitle = 'Your journey towards success begins here';
  buttonText = 'Get Started';
}
