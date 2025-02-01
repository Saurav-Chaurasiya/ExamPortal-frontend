import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {


  constructor(
    private _route: Router,
    private login : LoginService,
  ){}

  public logout(){

    Swal.fire({
              title: 'Do you want to logout?',
              showCancelButton: true,
              confirmButtonText: 'Submit',
              icon:'warning',
          }).then((e)=>{
            if (e.isConfirmed) {
              this.login.logout();
              window.location.reload();
            }
          });
    // alert()
  }
  
}
