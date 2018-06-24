import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { constants } from '../constants';
import { User } from './user.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthService {

  sessionExpiredError: boolean;
  authError: boolean;

  constructor(private http:HttpClient, private router: Router) { }

  login(user: User) {
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post<User>(constants.base_uri + '/login', user,
     { headers: reqHeader, observe: 'response' });
  }

  onLogin(res: HttpResponse<any>) {
    const token: string = res.headers.get('Authorization');
    const user: User = {
      username: res.headers.get('username'),
      role: res.headers.get('role'),
      password: ""
    }

    localStorage.setItem('token', token);

    if (user.role == 'ROLE_ADMIN'){
      this.router.navigate(['home']);
      this.authError = false;
      this.sessionExpiredError = false;
    }else {
      this.router.navigate(['login']);
      this.authError = true;
    }
  }

  logout(router: Router) {
    localStorage.removeItem("token");

    router.navigate(['login']);
  }

  public isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

}
