import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { User } from './user.model';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginError: boolean = false;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.isLoginError = false;
    this.authService.login(form.value).subscribe((res: HttpResponse<any>) => {
      this.authService.onLogin(res);
    },
      err => {
        this.isLoginError = true;
      }
    );
  }

}
