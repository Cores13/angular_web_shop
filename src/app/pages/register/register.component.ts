import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  typeConfirm: string = "password";
  isTextConfirm: boolean = false;
  eyeIconConfirm: string = "fa-eye-slash";
  registerForm!: FormGroup;
  passwordValidationMessage?: string;
  emailValidationMessage?: string;
  usernameValidationMessage?: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Username: ['', Validators.required],
      Email: ['', Validators.required],
      Password: ['', [
        Validators.required,
        Validators.minLength(8),
      ]],
      PasswordConfirm: ['', [
        Validators.required,
        Validators.minLength(8),
      ]],
    });
  }

  togglePasswordVisibility() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon ="fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  togglePasswordVisibilityConfirm() {
    this.isTextConfirm = !this.isTextConfirm;
    this.isTextConfirm ? this.eyeIconConfirm = "fa-eye" : this.eyeIconConfirm ="fa-eye-slash";
    this.isTextConfirm ? this.typeConfirm = "text" : this.typeConfirm = "password";
  }

  onSubmit() {
    if(this.registerForm.valid){
      this.authService.register(this.registerForm.value).subscribe({
        next: (res: any) => {
          this.registerForm.reset();
          this.router.navigate(['login']);
        },
        error: (res: any) => {
          if(res?.error.type){
            if(res?.error.type == 'Password'){
              this.passwordValidationMessage = res?.error.message;
            }else if(res?.error.type == 'Email') {
              this.emailValidationMessage = res?.error.message;
            }else if(res?.error.type == 'Username'){
              this.usernameValidationMessage = res?.error.message;
            }
          }else {
            alert(res?.error.message);
          }
        }
      });
    }else {
      this.validateFormFields(this.registerForm);
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

  resetPasswordValidation() {
    delete this.passwordValidationMessage;
  }

  resetEmailValidation() {
    delete this.emailValidationMessage;
  }

  resetUsernameValidation() {
    delete this.usernameValidationMessage;
  }
}
