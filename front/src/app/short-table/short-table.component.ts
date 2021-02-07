import {AfterViewInit, Component} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SVGListenerService} from '../utils/SVGListener.service';

export interface Dot {
  x: number;
  y: number;
  r: number;
  hit: boolean;
  date: string;
  exec_time: string;
}

@Component({
  selector: 'app-short-table',
  templateUrl: './short-table.component.html',
  styleUrls: ['./short-table.component.css']
})
export class ShortTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['x', 'y', 'r', 'hit', 'date'];
  dataSource = new MatTableDataSource();

  constructor(private http: HttpClient, private svgListenerService: SVGListenerService) {
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
    this.http.get<Observable<boolean>>('http://localhost:8080/rest/getDotsShort',
      { observe: 'response', withCredentials: true})
      .subscribe((data: any) => {
        if (data.body.hasError) {
          console.log(data);
        } else {
          this.dataSource = new MatTableDataSource(data.body.data);
        }
      });
  }
}
