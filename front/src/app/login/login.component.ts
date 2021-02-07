import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService, User} from './login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  // @ts-ignore
  loginForm: FormGroup;
  // @ts-ignore
  user: User;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }


  submit(): void {
    this.user = {
      // @ts-ignore
      username: (this.loginForm.get('username')).value,
      // @ts-ignore
      password: this.loginForm.get('password').value,
    };

    this.loginService.login(this.user).subscribe((data: any) => {
      console.log(data);
      if (data.body.hasError) {
        console.log(data);
        this.loginForm.controls.username.setErrors({invalid: true});
      } else {
        this.router.navigate(['/main']);
      }
    });
  }

  registerButton(): void {
    this.router.navigate(['/register']);
  }
}
