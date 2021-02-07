import { Component, OnInit } from '@angular/core';
import {LoginService, User} from '../login/login.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-registering',
  templateUrl: './registering.component.html',
  styleUrls: ['./registering.component.css']
})
export class RegisteringComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  // @ts-ignore
  registeringForm: FormGroup;
  // @ts-ignore
  user: User;

  ngOnInit(): void {
    this.registeringForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  register(): void {
    this.user = {
      username: (this.registeringForm.get('username')?.value) as unknown as string,
      password: this.registeringForm.get('password')?.value as unknown as string
    };

    console.log(this.user);

    this.loginService.register(this.user).subscribe((data: any) => {
      console.log(data);
      if (data.hasError) {
        console.log(data);
        this.registeringForm.controls.username.setErrors({invalid: true});
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
