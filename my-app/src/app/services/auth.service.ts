import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http :HttpClient) {}
  private url = 'http://127.0.0.1:5000/user/';
  register(author:any)
  {
return this.http.post(this.url+'register',author)
  }

login(author:any)
{
  return this.http.post(this.url+'login',author)
}
isLoggedIn()
{
  let token=localStorage.getItem('token');
  if(token)
    {
      return true
    }else
    {
      return false
    }
}
getUserIdFromToken()
{
  let token=localStorage.getItem('token');
if(token)
  {
    let data=JSON.parse(window.atob(token.split('.')[1]))
    // console.log(data.id);
    return data.id
    
  }
}
  getAuthorById(id:any){
    return this.http.get(this.url+id)
  }

}
