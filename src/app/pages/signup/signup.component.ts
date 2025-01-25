import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  standalone: false,
  
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private userService : UserService, private snack:MatSnackBar){}
  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };
  formSubmit(){
    console.log(this.user);
    if (this.user.username=='' || this.user.username
       == null
    ) {
      // alert('User is required !!')
      this.snack.open("Username is required*",'ok',
         {
          duration: 2000,
        }
      );
      return;
    }
    if (this.user.password=='' || this.user.password
      == null
   ) {
    
     this.snack.open("Password is required*",'ok',
        {
         duration: 2000,
       }
     );
     return;
   }
   if (this.user.firstName=='' || this.user.firstName
    == null
 ) {
  
   this.snack.open("First Name is required*",'ok',
      {
       duration: 2000,
     }
   );
   return;
 }
 if (this.user.lastName=='' || this.user.lastName
  == null
) {

 this.snack.open("Last Name is required*",'ok',
    {
     duration: 2000,
   }
 );
 return;
}
if (this.user.email=='' || this.user.email
  == null
) {

 this.snack.open("Email is required*",'ok',
    {
     duration: 2000,
   }
 );
 return;
}
if (this.user.phone=='' || this.user.phone
  == null
) {

 this.snack.open("Phone number is required*",'ok',
    {
     duration: 2000,
   }
 );
 return;
}

    // adduser : userseervice
    this.userService.addUser(this.user).subscribe((data: any)=>{
      // success
      console.log(data);
      // alert('success !!');
      swal.fire('Success !!', 'user is registered with id:'+' '+ data.id,'success');
    },
  (error)=>{
    // error
    console.log(error);
    // alert('something went wrong');
    this.snack.open("Something went wrong*",'ok',
      {
       duration: 2000,
     }
   );
  }
);
  }


}
