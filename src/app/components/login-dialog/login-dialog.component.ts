import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  username:string = ""
  password:string = ""
  constructor() { }

  ngOnInit(): void {
  }

}
