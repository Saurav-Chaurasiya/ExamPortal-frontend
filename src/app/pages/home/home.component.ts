// import { Component } from '@angular/core';
// import { Router, RouterLink } from '@angular/router';

// @Component({
//   selector: 'app-home',
//   standalone: false,
  
//   templateUrl: './home.component.html',
//   styleUrl: './home.component.css'
// })
// export class HomeComponent {
//   constructor(
//     private _router : Router,
//   ){}
//   title = 'Welcome to ParikshaPrep!';
//   subtitle = 'Your journey towards success begins here';
//   buttonText = 'Get Started';
//   GetStarted(){
//     this._router.navigate(['/login/']);
//   }
//   register() {
//     // Add your registration logic here
//     console.log('Register button clicked');
//   }
// }
// home.component.ts
// home.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router) {}

  navigateToCourses() {
    this.router.navigate(['/courses']);
  }

  navigateToTests() {
    this.router.navigate(['/tests']);
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}