import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // phase checkpoint, used for indication purpose
  checkPoints:checkPoint[] = [
    {name:"Uploading",description:"uploading the diploma file",completed:false,isEnd:false},
    {name:"Checking",description:"checking the right file format",completed:false,isEnd:false},
    {name:"Verifing",description:"Interacting with the blockchain",completed:false,isEnd:false},
    {name:"Done",description:"Done",completed:false,isEnd:true}
  ]
  constructor() { }

  ngOnInit(): void {
  }
  onUploadNotif(){
    this.checkPoints[0].completed = true;
    this.checkPoints[0].valid = true
  }
  onCheckNotif(){
    this.checkPoints[1].completed = true;
    this.checkPoints[1].valid = true


  }
  onVerifyingNotif(verified:boolean){
    this.checkPoints[2].completed = true;
    this.checkPoints[2].valid= true;
    this.checkPoints[3].completed = true;
    this.checkPoints[3].valid= verified;
  }
}
interface checkPoint{
  name?:string;
  description?: string;
  isEnd?: boolean;
  completed?:boolean
  valid?:boolean
}
