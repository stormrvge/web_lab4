import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class SVGListenerService {
  private radius = new Subject<number>();
  invokeRefresh: Subject<any> = new Subject<any>();

  constructor() {
  }

  public getRadius(): Observable<number> {
    return this.radius.asObservable();
  }

  public updateRadius(radius: number): void {
    this.radius.next(radius);
  }

  public refreshTable(): void {
    this.invokeRefresh.next(true);
  }
}
