import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(
    private _router : Router,
  ){}
  title = 'Welcome to Pariksha!';
  subtitle = 'Your journey towards success begins here';
  buttonText = 'Get Started';
  GetStarted(){
    this._router.navigate(['/login/']);
  }
}
