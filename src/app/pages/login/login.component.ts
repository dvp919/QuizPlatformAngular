import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{


  loginData = {
    username:'',
    password:'',
  }


  constructor(private snack:MatSnackBar, private login:LoginService, private router:Router) {}
  
  ngOnInit(): void {}


  formSubmit() {
    console.log("Login form submit..")

    if(this.loginData.username.trim()=='' || this.loginData.username==null)
    {
        this.snack.open("Username is required!..",'',{
          duration:3000,
        });
        return;
    }
    if(this.loginData.password.trim()=='' || this.loginData.password==null)
    {
        this.snack.open("password is required!..",'',{
          duration:3000,
        });
        return;
    }
    if(this.loginData.password.length>8)
    {


    //Request server for generating token
    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log("success");
        console.log(data);


        //Login..

        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe(
          (user:any) =>{
            this.login.setUser(user);
            console.log(user);

            //Redirect to admin: admin-dashboard

            //Redirect to normal: user-dashboard

            if(this.login.getUserRole()=="ADMIN")
            {
              //Admin Dashboard
              // window.location.href='/admin';
              this.router.navigate(['admin']);
              this.login.loginStatusSubject.next(true);
            }
            else if(this.login.getUserRole()=="NORMAL"){
              //User home dashboard
              // window.location.href='/user-dashboard';
              this.router.navigate(['user-dashboard/0']);
              this.login.loginStatusSubject.next(true);
            }
            else{
              this.login.logout();
              
            }


          }
        )


      },
      (error) =>{
        console.log("error");
        console.log(error);
        this.snack.open("Invalid Details! Try again!","",{
          duration:3000,
        })
      }
    );

  }
  else
  {
    this.snack.open("Password should be more than 8 characters",'',{
      duration:3000,
    });
    return;
  }
}
}
