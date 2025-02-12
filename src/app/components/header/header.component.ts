import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isDarkMode: boolean = false;

  ngOnInit(): void {
    // Retrieve theme preference from localStorage
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme === 'dark';
    this.applyTheme(this.isDarkMode);
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme(this.isDarkMode);
    // Save theme preference to localStorage
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  applyTheme(isDarkMode: boolean): void {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}