import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear: number;

  constructor() {
    // Get the current year for the copyright notice
    this.currentYear = new Date().getFullYear();
  }
}