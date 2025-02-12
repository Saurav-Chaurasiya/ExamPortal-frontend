import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private isDarkMode: boolean = false;

  constructor(private http: HttpClient) {
    // Initialize theme from localStorage (if previously saved)
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme === 'dark';
    this.applyTheme(this.isDarkMode);
  }

  // Toggle the theme between light and dark
  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme(this.isDarkMode);

    // Save theme preference to localStorage
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');

    // Save theme preference to backend (e.g., user profile)
    const userId = '123'; // Replace with actual user ID
    this.http.post('/api/user/theme', { userId, theme: this.isDarkMode ? 'dark' : 'light' })
      .subscribe(() => console.log('Theme preference saved'));
  }

  // Apply the theme to the body element (you can customize this based on your app's requirements)
  private applyTheme(isDarkMode: boolean): void {
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }
}
