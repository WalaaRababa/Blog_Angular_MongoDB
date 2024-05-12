import { Component,OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Article, Articles } from '../../../../type';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
constructor(private data:ArticleService){}
articles:Article[]=[]
ngOnInit(): void
{
  this.data.getAllArticle().subscribe(
    res=>
      {
        this.articles=(res as any).articles
        console.log(this.articles);

      },error=>
        {
          console.log(error);
          
        }
  )
}

}
