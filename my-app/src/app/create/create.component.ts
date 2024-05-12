import { Component } from '@angular/core';
import { Article } from '../../../type';
import { ArticleService } from '../services/article.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AngularEditorModule } from '@kolkov/angular-editor';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule, CommonModule,AngularEditorModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  article: Article = {
    title: '',
    content: '',
    idAuthor: 0,
    image: '',
    description: '',
    tags: [],
  };
  img: string = '';
  tag: string = '';

  constructor(private article_http: ArticleService, private auth: AuthService, private router:Router) { }
  select(event: any) {
    this.img= event.target.files[0]
  }

  addArticle() {
    let fd = new FormData()
    fd.append('title', this.article.title)
    fd.append('content', this.article.content)
    fd.append('idAuthor', this.auth.getUserIdFromToken())
    fd.append('description', this.article.description)
    fd.append('image', this.img)
    fd.append('tags', this.article.tags.toString())

console.log(fd);

    this.article_http.createArticle(this.article).subscribe(res => {
      console.log(res);

    }, error => {
      console.log(error);

    }

    )
  }
  create()
  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const articleData = {
      title: this.article.title,
      content: this.article.content,
      idAuthor: this.auth.getUserIdFromToken(),
      description: this.article.description,
      tags: this.article.tags.toString(),
      image: this.img
    };
    this.article_http.createNewArticle(articleData, headers).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/home'])

      },
      error => {
        console.log(error);
      }
    );
  }
}
