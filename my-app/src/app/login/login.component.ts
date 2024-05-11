import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private auth_http:AuthService, private router :Router){}
author={
email:'',
password:''
}
token:any
login()
{
this.auth_http.login(this.author).subscribe(
  res=>
    {
      console.log(res);
      this.token=res;
      localStorage.setItem("token",this.token)
      this.router.navigate(['/home'])
    },error=>
      {
        console.log(error);
        
      }
)
}
}
