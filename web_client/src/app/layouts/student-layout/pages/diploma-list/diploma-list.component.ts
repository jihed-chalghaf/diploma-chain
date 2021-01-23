import { Component, Input, OnInit } from '@angular/core';
import { Diploma } from 'app/models/diploma.model';
import { Student } from 'app/models/student.model';

@Component({
  selector: 'app-diploma-list',
  templateUrl: './diploma-list.component.html',
  styleUrls: ['./diploma-list.component.css']
})
export class DiplomaListComponent implements OnInit {
  @Input() diplomas: any[];
  @Input() student: Student[];

  constructor() { }


  ngOnInit(): void {
  }

}
