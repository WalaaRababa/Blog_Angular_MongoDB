import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private auth_Http: AuthService,private router :Router) { }
  author = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    about: ''
  }
  img: any
  select(e: any) {
    this.img = e.target.files[0]
  }
  register() {
    let fd = new FormData()
    fd.append('name', this.author.name)
    fd.append('lastName', this.author.lastName)
    fd.append('email', this.author.email)
    fd.append('password', this.author.password)
    fd.append('about', this.author.about)
    fd.append('img', this.img)
    this.auth_Http.register(fd).subscribe(res => {
      console.log(res);
this.router.navigate(['/login'])
    }, error => {
      console.log(error);

    }
    )



  }
}
