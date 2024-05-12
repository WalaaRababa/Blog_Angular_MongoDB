import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { Article } from '../../../type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
constructor(private act:ActivatedRoute,private data:ArticleService){}
id:string|null='';
article:Article={
  title: '',
  content: '',
  idAuthor: '',
  image: '',
  description: '',
  tags: [],
  date:''
}
ngOnInit(): void {
  this.id=this.act.snapshot.paramMap.get('id')
  this.data.getArticleById(this.id).subscribe(res=>
    {
      console.log(res);
      this.article=(res as any).article
      
      
    },error=>
      {
        console.log(error);
        
      }
  )
}
}
