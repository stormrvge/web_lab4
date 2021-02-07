import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SelectItem} from 'primeng/api';
import {HttpClient} from '@angular/common/http';
import {ShortTableComponent} from '../short-table/short-table.component';
import {SVGListenerService} from '../utils/SVGListener.service';
import {LogoutListenerService} from '../utils/LogoutListener.sevice';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  isAuthenticated: boolean;
  dropDownValues: SelectItem[];

  // @ts-ignore
  subscription: Subscription;

  // @ts-ignore
  dotsForm: FormGroup;

  // @ts-ignore
  @ViewChild(ShortTableComponent) shortTableComponent: ShortTableComponent;

  constructor(private http: HttpClient, private radiusListenerService: SVGListenerService,
              private logoutService: LogoutListenerService, private router: Router) {
    this.isAuthenticated = true;
    this.logoutService.updateAuthState(this.isAuthenticated);

    this.dropDownValues = [{value: -4, label: '-4'}, {value: -3, label: '-3'}, {value: -2, label: '-2'}, {value: -1, label: '-1'},
      {value: 0, label: '0'}, {value: 1, label: '1'}, {value: 2, label: '2'}, {value: 3, label: '3'}, {value: 4, label: '4'}];
  }

  ngOnInit(): void {
    this.subscription = this.logoutService.isAuth()
      .subscribe(auth => this.isAuthenticated = auth);

    this.dotsForm = new FormGroup({
      xValue: new FormControl('', [Validators.required]),
      yValue: new FormControl('', [Validators.pattern('[0-9]'),
        Validators.required, Validators.max(2.9999999999999), Validators.min(-2.99999999999999),
        Validators.maxLength(15)]),
      rValue: new FormControl('', [Validators.required])
    });


    this.logoutService.updateAuthState(this.isAuthenticated);
  }

  radiusUpdate(): void {
    this.radiusListenerService.updateRadius(this.dotsForm.get('rValue')?.value);
  }

  submit(): void {
    this.http.get('http://localhost:8080/rest/dot', {params: {
      x: this.dotsForm.get('xValue')?.value,
      y: this.dotsForm.get('yValue')?.value,
      r: this.dotsForm.get('rValue')?.value}, observe: 'response', withCredentials: true})
      .subscribe((data: any) => {
        if (data.body.hasError) {
          console.log(data);
        }
      });
  }

  goToResults(): void {
    this.router.navigate(['/results']);
  }
}
