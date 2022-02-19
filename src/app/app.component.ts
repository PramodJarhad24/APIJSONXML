import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from './services/user.service';
import * as xml2js from "xml2js";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'angulartest';

  mergedData:any = [];
  jsondata = [];

  constructor(private userService:UserService){
  }
   ngOnInit(){
     this.getJSONData();
  }

  getJSONData(){
    this.userService.getResponse1().subscribe((dataJSON:any) => {
      this.jsondata = dataJSON.person; 
      this.jsondata.forEach((element:any) => {
          this.mergedData.push(element);
      });
      this.getXMLData();
    });
 }

 getXMLData(){
  this.userService.getResponse2().subscribe((data) => {
    const p:xml2js.Parser = new xml2js.Parser();
     p.parseString(data, (err:any, result:any) => {
     result.persons.person.forEach((element:any) => {
           var item = {
             'id': parseInt(element.id[0]),
             "firstName": element.firstName[0],
             "lastName": element.lastName[0],
           }
           this.mergedData.push(item);
       });
     });
     let finalData = this.mergedData.sort(this.sortByID)
   console.log("finalData")
   console.log(finalData)
   });
 }

  sortByID(x:any,y:any) {
    console.log("x = "+x.id)
    console.log("y = "+y.id)
    return x.id - y.id; 
  }

}
