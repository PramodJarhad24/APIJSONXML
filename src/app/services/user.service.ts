import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient){

  }
   getResponse1(){
    return this.http.get("assets/mockData/response1.json");
   }
   getResponse2(){
    return this.http.get("assets/mockData/response2.xml", { responseType: "text" });
   }
}
