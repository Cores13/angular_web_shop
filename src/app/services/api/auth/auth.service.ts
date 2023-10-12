import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenApiModel } from '../../../models/token-api.model';
import { config } from 'src/app/config';

interface IUserLogin {
  email: string;
  password: string;
}
interface IUserRegister {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = config.API_BASE_URL + "Auth";
  private userPayload: any;

  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodeToken();
  }

  register(user: IUserRegister){
    return this.http.post<any>(`${this.baseUrl}/register`, user);
  }

  login(user: IUserLogin){
    return this.http.post<any>(`${this.baseUrl}/login`, user);
  }

  logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['admin/login']);
  }

  storeToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  getToken() {
    return localStorage.getItem('jwtToken');
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('jwtToken');
  }

  decodeToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token);
  }

  getFullNameFromToken() {
    return this.userPayload.unique_name;
  }

  getRoleFromToken() {
    return this.userPayload.role;
  }

  storeRefreshToken(refreshToken: string) {
    localStorage.setItem('refreshToken', refreshToken);
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  renewToken(tokenApi: TokenApiModel) {
    return this.http.post<any>(this.baseUrl + '/renewrefreshtoken', tokenApi);
  }
}
