import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header-auth',
  templateUrl: './header-auth.component.html',
  styleUrls: ['./header-auth.component.css']
})
export class HeaderAuthComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.http.get('http://localhost:8080/rest/logout', {observe: 'response',
      withCredentials: true}).subscribe((data: any) => {
      console.log(data);
      this.router.navigate(['/login']);
    });
  }

  goToMain(): void {
    this.router.navigate(['/main']);
  }
}
