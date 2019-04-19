import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  // url: String = 'http://localhost:3000';
  url: String = 'https://ewall-api.herokuapp.com';


  constructor(private http: HttpClient) { }

  adduser(user) {
    return this.http.post(this.url +'/user', user);
  }

  me(){
    return this.http.get(this.url+'/user/me');
  }
  login(user){  
    return this.http.post(this.url+'/user/login',user);
  }
  logout(){
    return this.http.delete(this.url+'/user/me/token');
  }
  addPost(post){
    return this.http.post(this.url+'/post',post);
  }

  getpost(){
    return this.http.get<any[]>(this.url+'/post');
  }
}

