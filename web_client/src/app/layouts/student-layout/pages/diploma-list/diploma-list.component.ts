import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-diploma-list',
  templateUrl: './diploma-list.component.html',
  styleUrls: ['./diploma-list.component.css']
})
export class DiplomaListComponent implements OnInit {
  @Input() diplomas=[];
  constructor() { }

  ngOnInit(): void {
    if(this.diplomas.length===0){
      // generate fake diplomas for display purpose
      this.diplomas=[{
        title: "Hola",
        description: "testing",
        university: "Insat",
        signature: "Joe Chalghaf",
        verified:true
      },{
        title: "Yo",
        description: "oupa",
        university: "Insat",
        signature: "Khalil 3asir",
        verified:false
      },
      {
        title: "Salem",
        description: "Labib",
        university: "Insat",
        signature: "Dali 3asir",

      },{
        title: "Salem",
        description: "Labib",
        university: "Insat",
        signature: "Dali 3asir",

      },{
        title: "Salem",
        description: "Labib",
        university: "Insat",
        signature: "Dali 3asir",

      },{
        title: "Salem",
        description: "Labib",
        university: "Insat",
        signature: "Dali 3asir",

      },{
        title: "Salem",
        description: "Labib",
        university: "Insat",
        signature: "Dali 3asir",

      },{
        title: "Salem",
        description: "Labib",
        university: "Insat",
        signature: "Dali 3asir",

      },{
        title: "Salem",
        description: "Labib",
        university: "Insat",
        signature: "Dali 3asir",

      },{
        title: "Salem",
        description: "Labib",
        university: "Insat",
        signature: "Dali 3asir",

      },{
        title: "Salem",
        description: "Labib",
        university: "Insat",
        signature: "Dali 3asir",

      },{
        title: "Salem",
        description: "Labib",
        university: "Insat",
        signature: "Dali 3asir",

      },];
    }
  }

}
