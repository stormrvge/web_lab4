import {AfterViewInit, Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SVGListenerService} from '../utils/SVGListener.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-full-table',
  templateUrl: './full-table.component.html',
  styleUrls: ['./full-table.component.css']
})
export class FullTableComponent implements AfterViewInit{
  dots = [];

    constructor(private http: HttpClient, private svgListenerService: SVGListenerService,
                private router: Router) {
    this.svgListenerService.invokeRefresh.subscribe(value => {
      if (value === true) {
        this.refreshTable();
      }
    });
  }

  ngAfterViewInit(): void {
    this.refreshTable();
  }

  refreshTable(): void {
    this.http.get<Observable<boolean>>('http://localhost:8080/rest/getDots',
      { observe: 'response', withCredentials: true})
      .subscribe((data: any) => {
        if (data.body.hasError) {
          console.log(data);
        } else {
          console.log(data);

          this.dots = data.body.data;
        }
      });
  }

  goToMain(): void {
      this.router.navigate(['/main']);
  }

  clearTable(): void {
    this.http.delete<Observable<boolean>>('http://localhost:8080/rest/clear',
      {observe: 'response', withCredentials: true})
      .subscribe((data: any) => {
        if (data.body.hasError) {
          console.log(data);
        } else {
          console.log(data);

          this.dots = data.body.data;
        }
      });
  }
}
