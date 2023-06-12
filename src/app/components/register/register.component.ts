import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private toastrService: ToastrService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  register() {
    if (this.registerForm.valid) {
      let registerModel = Object.assign({}, this.registerForm.value);
      //console.log(registerModel);
      this.authService.register(registerModel).subscribe(response => {
        //console.log(response);
        window.localStorage.setItem("token", response.data.token);
        window.localStorage.setItem("email", registerModel.email);
        this.authService.getLoggedInUser(registerModel.email);
        this.toastrService.success(response.message, "Kayıt Başarılı");
        this.router.navigate(["/"]);
      }
        , responseError => {
          if (responseError.error.ValidationErrors) {
            for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
              this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama Hatası");
            }
          }
          else {
            this.toastrService.error(responseError.error.message, "Kayıt Başarısız");
          }
        })
    }
    else {
      this.toastrService.error("Formunuz Eksik!", "Hata");
    }
  }

}
