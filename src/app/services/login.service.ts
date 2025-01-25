import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();
  
  isLogIn() {
    throw new Error('Method not implemented.');
    }

  constructor(private http: HttpClient) { }

  // Check if localStorage is available
  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  // Current user: Which is LoggedIn
  public getCurrentUser() {
    return this.http.get(`${baseUrl}/current-user`);
  }

  // Generate token
  public generateToken(loginData: any) {
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  // Login user: set token in LocalStorage
  public loginUser(token: any) {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem("token", token);
      return true;
    }
    return false;
  }

  // Is Logged in: user is Logged in or not
  public isLoggedIn() {
    if (this.isLocalStorageAvailable()) {
      const tokenStr = localStorage.getItem('token');
      return tokenStr !== undefined && tokenStr !== '' && tokenStr !== null;
    }
    return false;
  }

  // Logout: remove token from local Storage
  public logout() {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return true;
  }

  // Get token
  public getToken() {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem('token');
    }
    return null;
  }

  // Set userDetail
  public setUser(user: any) {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  // Get user
  public getUser() {
    if (this.isLocalStorageAvailable()) {
      const userStr = localStorage.getItem("user");
      if (userStr != null) {
        return JSON.parse(userStr);
      }
    }
    this.logout();
    return null;
  }

  // Get user role
  public getUserRole() {
    const user = this.getUser();
    return user?.authorities[0]?.authority ?? null;
  }
}
