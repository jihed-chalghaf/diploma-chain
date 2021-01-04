import { Component, OnInit } from '@angular/core';
import { Diploma } from 'app/models/diploma.model';
import { DiplomaService } from 'app/services/diploma.service';

@Component({
  selector: 'app-diploma-list',
  templateUrl: './diploma-list.component.html',
  styleUrls: ['./diploma-list.component.css']
})
export class DiplomaListComponent implements OnInit {

  diplomas: Diploma[];

  constructor(private diplomaService: DiplomaService) { }

  ngOnInit(): void {
    this.getDiplomas();
  }

  getDiplomas() {
    this.diplomas = this.diplomaService.getDiplomas();
  }

}
