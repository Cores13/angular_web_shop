import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPassword } from '../../../models/reset-password.model';
import { config } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {
  private baseUrl: string = config.API_BASE_URL + 'Auth';

  constructor(private http: HttpClient) { }

  passwordReset(resetPasswordObj: ResetPassword){
    return this.http.post<any>(`${this.baseUrl}/password-reset`, resetPasswordObj);
  }

  sendResetPasswordLink(email: string){
    return this.http.post<any>(`${this.baseUrl}/resetpassword/${email}`, {});
  }
}
