import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-author',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './author.component.html',
  styleUrl: './author.component.scss'
})
export class AuthorComponent implements OnInit{
  constructor(private act :ActivatedRoute,private auth_http:AuthService){}
  id:any
  author:any
  ngOnInit(): void
  {
this.id=this.act.snapshot.paramMap.get('id')
this.auth_http.getAuthorById(this.id).subscribe(res=>
  {
    console.log((res as any).user); 
    this.author=(res as any).user
    
  },error=>
    {
      console.log(error);
      
    }
)
  }
}
