import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  url:String='http://localhost:3000';

  constructor(private http:HttpClient) { }

     adduser(user){
      return this.http.post(this.url+'user',user);
 
  }
}
