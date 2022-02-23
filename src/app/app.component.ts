import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from './services/user.service';
import * as xml2js from "xml2js";
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'angulartest';

  mergedData:any = [];
  jsondata:any = [];
  websites = [
    {value: '1', viewValue: 'aaa.com'},
    {value: '2', viewValue: 'HDTuto.com'},
    {value: '3', viewValue: 'bbb.com'}
  ];

  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(private userService:UserService,
    private http: HttpClient){
  }
  
  ngOnInit(){
    let character = this.http.get("assets/mockData/response1.json");
    let characterHomeworld = this.http.get("assets/mockData/response2.xml", { responseType: "text" });

    forkJoin([character, characterHomeworld]).subscribe(results => {
      
      this.jsondata = results[0]; 
      this.jsondata.person.forEach((element:any) => {
          this.mergedData.push(element);
      });

      const p:xml2js.Parser = new xml2js.Parser();
     p.parseString(results[1], (err:any, result:any) => {
     result.persons.person.forEach((element:any) => {
           var item = {
             'id': parseInt(element.id[0]),
             "firstName": element.firstName[0],
             "lastName": element.lastName[0],
           }
           this.mergedData.push(item);
       });
     });
     this.mergedData.sort(this.sortByID);
    });
  }


  
  sortByID(x:any,y:any) {
    return x.id - y.id; 
  }

  onSelectEvent(val:any){

  }

}
