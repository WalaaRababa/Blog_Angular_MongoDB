import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../services/article.service';
import { Article } from '../../../type';
@Component({
  selector: 'app-author',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './author.component.html',
  styleUrl: './author.component.scss'
})
export class AuthorComponent implements OnInit {
  constructor(private act: ActivatedRoute, private auth_http: AuthService, private data: ArticleService) { }
  id: string|null=''
  author: any
  MyArticles:Article[]=[]
  ngOnInit(): void|any {
    this.id = this.act.snapshot.paramMap.get('id')
    this.auth_http.getAuthorById(this.id).subscribe(res => {
      console.log((res as any).user);
      this.author = (res as any).user

    }, error => {
      console.log(error);

    }
    )
    this.data.getArticleByAuthor(this.id).subscribe(res=>{
      console.log(res);
this.MyArticles=(res as any).articles
      
    },error=>
      {
console.log(error);

      }
     
    )
   
  }

  
   
  
  
}
