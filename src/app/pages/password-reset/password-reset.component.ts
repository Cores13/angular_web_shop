import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmPasswordValidator } from 'src/app/helpers/confirm-passowrd.validator';
import { ResetPassword } from 'src/app/models/reset-password.model';
import { PasswordResetService } from 'src/app/services/password-reset.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  typeConfirm: string = "password";
  isTextConfirm: boolean = false;
  eyeIconConfirm: string = "fa-eye-slash";
  passwordResetForm!: FormGroup;
  passwordValidationMessage?: string;
  emailValidationMessage?: string;
  usernameValidationMessage?: string;

  // emailToReset!: string;
  // emailToken!: string;
  resetPasswordObj = new ResetPassword();

  constructor(private formBuilder: FormBuilder, private passwordResetService: PasswordResetService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.passwordResetForm = this.formBuilder.group({
      Password: ['', [
        Validators.required,
        Validators.minLength(8),
      ]],
      PasswordConfirm: ['', [
        Validators.required,
        Validators.minLength(8),
      ]],
     },
     {
      validator: ConfirmPasswordValidator("Password", "PasswordConfirm")
     });

     this.activatedRoute.queryParams.subscribe(params => {
      this.resetPasswordObj.Email = params['email'];
      this.resetPasswordObj.EmailToken = params['code'].replace(/ /g, '+');
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
    if(this.passwordResetForm.valid){
      this.resetPasswordObj.NewPassword = this.passwordResetForm.value['Password'];
      this.resetPasswordObj.PasswordConfirm = this.passwordResetForm.value['PasswordConfirm'];

      this.passwordResetService.passwordReset(this.resetPasswordObj).subscribe({
        next: (res: any) => {
          this.passwordResetForm.reset();
          this.router.navigate(['login']);
        },
        error: (res: any) => {
          if(res?.error.type){
            if(res?.error.type == 'Password'){
              this.passwordValidationMessage = res?.error.message;
            }
          }else {
            alert(res?.error.message);
          }
        }
      });
    }else {
      this.validateFormFields(this.passwordResetForm);
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
