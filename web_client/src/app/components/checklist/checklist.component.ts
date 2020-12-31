import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit {
  @Input() isHorizantale:boolean=false;
  @Input() checkPoints:checkPoint[];
  constructor() { }

  ngOnInit(): void {
    this.checkPoints = [
      {name:"test1",description:"testing",isEnd:false},
      {name:"test1",description:"testing",isEnd:false},
      {name:"test1",description:"testing",isEnd:false},
      {name:"test1",description:"testing",isEnd:false},
      {name:"Oupa",description:"final",isEnd:true}
    ]
  }
   
}

class checkPoint{
  name?:string;
  description?: string;
  isEnd?: boolean;
}

