import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'app/services/web3.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private web3Service: Web3Service) { }

  ngOnInit(): void {
  }

}
