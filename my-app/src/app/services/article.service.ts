import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../../../type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
private url:string='http://127.0.0.1:5000/article/'
  constructor(private http:HttpClient) { }
  createArticle(article:Article|FormData):Observable<any>
  {
return this.http.post<any>(this.url+'all',article)
  }
  createNewArticle(article:Article|any,headers:HttpHeaders):Observable<any>
  {
    const options = { headers: headers }; 
return this.http.post<any>(this.url+'all',article,options)
  }
  getAllArticle():Observable<any>
  {
    return this.http.get(this.url)
  }
  getArticleByAuthor(id:any):Observable<any>
  {
    return this.http.get<any>(this.url+'searchBy/'+id)
  }
  getArticleById(id:any):Observable<any>
  {
    return this.http.get<any>(this.url+id)
  }
}
