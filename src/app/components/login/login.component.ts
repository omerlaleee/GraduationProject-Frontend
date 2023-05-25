import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms"
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private toastrService: ToastrService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);
      //console.log(loginModel);
      this.authService.login(loginModel).subscribe(response => {
        //console.log(response);
        window.localStorage.setItem("token", response.data.token);
        window.localStorage.setItem("email", loginModel.email);
        console.log("Token → " + response.data.token);
        console.log("Expiration Date of Token → " + response.data.expiration);
        this.toastrService.success(response.message, "Giriş Başarılı");
        //console.log(this.router.url)
        this.router.navigate(["/"]);
      }
        , responseError => {
          //console.log(responseError);
          this.toastrService.error(responseError.error.message, "Giriş Başarısız");
        })
    }
    else {
      this.toastrService.error("Formunuz Eksik!", "Hata");
    }
  }

}
