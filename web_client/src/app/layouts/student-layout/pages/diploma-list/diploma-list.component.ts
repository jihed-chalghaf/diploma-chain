import { Component, Input, OnInit } from '@angular/core';
import { Diploma } from 'app/models/diploma.model';

@Component({
  selector: 'app-diploma-list',
  templateUrl: './diploma-list.component.html',
  styleUrls: ['./diploma-list.component.css']
})
export class DiplomaListComponent implements OnInit {
  @Input() diplomas: any[];
  

  constructor() { }


  ngOnInit(): void {
    console.log(this.diplomas)
    /* if(!this.diplomas || this.diplomas.length===0){
      // generate fake diplomas for display purpose
      // to avoid giving errors in the diploma component, I kept returning this wrong form
      // I think we don't need the interface at all at that component for the following reasons:
      // verified attribute can be discarded and we create a pendingDiplomas Component for the admin
      // in all the cases, the fct in the smart contract returns only the verified diplomas..
      this.diplomas = [
      {
        title: "Title 1",
        verified:true
      },
      {
        title: "Title 2",
        verified:false
      },
      {
        title: "Title 3",
      },
      {
        title: "Title 4",
      },  
      {
        title: "Title 5",
      },
      {
        title: "Title 6",
      },
      {
        title: "Title 7",
      },
      {
        title: "Title 8",
      }    
      ];
    } */
  }

}
