import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // phase checkpoint, used for indication purpose
  checkPoints = [
    {name:"Uploading",description:"uploading the diploma file",completed:true,isEnd:false},
    {name:"Checking",description:"checking the right file format",completed:true,isEnd:false},
    {name:"Hashing",description:"Hashing the diploma content",completed:false,isEnd:false},
    {name:"Verifing",description:"Interacting with the blockchain",completed:false,isEnd:false},
    {name:"Done",description:"Done",completed:true,isEnd:true}
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
