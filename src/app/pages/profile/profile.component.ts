import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: any = null;
  constructor(private login: LoginService) {}
  ngOnInit() : void {
    this.user = this.login.getUser();
  //   this.login.getCurrentUser().subscribe(
  //     (user: any) => {
  //     this.user = user;
  //     },
  //   (error: any) => {
  //     console.log(error);
  //   }
  // );
  }

}
