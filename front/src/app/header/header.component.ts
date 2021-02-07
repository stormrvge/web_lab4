import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

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

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
