import { Component, OnInit } from '@angular/core';
import { UserForLoginDto } from 'src/app/models/userForLoginDto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForLoginDto: UserForLoginDto;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }



}
