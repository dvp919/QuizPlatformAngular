import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService, private snack: MatSnackBar,private _router:Router) { }

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  ngOnInit(): void { }


  formSubmit() {
    console.log(this.user);
    if (this.user.username == '' || this.user.username == null) {
      // alert("Username is required !!")
      this.snack.open("Username is required... ",'',{
        duration:3000,
      });
      return;
    }

    if(this.user.password.length>8)
    {
    //addUser : userService
    this.userService.addUser(this.user)
      .subscribe((data:any) => {
        //Success
        console.log(data);
        // alert('success');
        Swal.fire('Successfully Registered','Thank you ' + data.firstName + ' '+ data.lastName + ' ','success')
        .then((result)=>
        {
          if(result.isConfirmed)
          {
            this._router.navigate(['/login']);
          }
        }
        );
        
      },
        (error) => {
          //Error
          console.log(error);
          // alert('Something Went Wrong...');
          this.snack.open("Something went wrong.... ",'',{
            duration:600,
          });
        }

      )

  }
  else
  {
    this.snack.open("Password should be more than 8 characters ",'',{
      duration:3000,
    });
    return;
  }
}

  //this.user



}
