import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    username: '',
    password: '',
  };
  constructor(private snack: MatSnackBar, private login: LoginService, private router: Router) {
  }

  formSubmit() {
    console.log('login button clicked!!');

    if (this.loginData.username.trim() == '' || this.loginData.username == null) {

      this.snack.open('Username is required !!', '', {
        duration: 2000,
      });
      return;
    }
    if (this.loginData.password.trim() == '' || this.loginData.password == null) {

      this.snack.open('password is required !!', '', {
        duration: 2000,
      });
      return;
    }

    // request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log('success');
        console.log(data);

        // login...
        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe(
          (user: any) => {
            this.login.setUser(user);
            console.log(user);

            // redirect ....ADMIN: admin-dashboard
            // redirect ....NORMAL: normal-dashboard
            if (this.login.getUserRole() == "ADMIN") {
              // admin dashboard
              // window.location.href='/admin';
              this.router.navigate(['admin']);
              this.login.loginStatusSubject.next(true);


            } else if (this.login.getUserRole() == "NORMAL") {

              // user-dashboard
              // window.location.href='/user-dashboard';
              this.router.navigate(['user-dashboard/0']);
              this.login.loginStatusSubject.next(true);
            } else {
              this.login.logout();
            }
          });
      },
      (error: any) => {
        console.log('Error');
        console.log(error);
        this.snack.open("Invalid Details.. Try again", 'ok', {
          duration: 3000,
        });
      }
    );
  }
}