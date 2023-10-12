import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/api/auth/auth.service';
import { PasswordResetService } from 'src/app/services/api/password-reset/password-reset.service';
import { UserService } from 'src/app/services/api/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;

  // Forgot password variables
  public resetPasswordEmail!: string;
  public isValidEmail!: boolean;
  public isModalVisible: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private userService: UserService, private passwordResetService: PasswordResetService) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }

  togglePasswordVisibility() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon ="fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onSubmit() {
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          this.loginForm.reset();
          this.authService.storeToken(res.accessToken);
          this.authService.storeRefreshToken(res.refreshToken);
          let tokenPayload = this.authService.decodeToken();
          this.userService.setFullName(tokenPayload.unique_name);
          this.userService.setRole(tokenPayload.role);
          this.router.navigate(['dashboard']);
        },
        error: (res: any) => {
          alert(res?.error.message);
        }
      });
    }else {
      this.validateFormFields(this.loginForm);
    }
  }

  private validateFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);

      if(control instanceof FormControl){
        control.markAsDirty({onlySelf: true});
      }else if(control instanceof FormGroup){
        this.validateFormFields(control);
      }
    });
  }

  toggleModal() {
    this.isModalVisible = !this.isModalVisible;
  }

  validateEmail(event: string){
    const value = event;
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }

  sendResetPasswordMail(){
    if(this.validateEmail(this.resetPasswordEmail)){
      this.passwordResetService.sendResetPasswordLink(this.resetPasswordEmail)
      .subscribe({
        next: (res: any) => {
          this.resetPasswordEmail = "";
          this.toggleModal();
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    }
  }
}
