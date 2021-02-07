import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class LogoutListenerService {
  private auth = new Subject<boolean>();

  constructor() {
  }

  public isAuth(): Observable<boolean> {
    return this.auth.asObservable();
  }

  public updateAuthState(auth: boolean): void {
    this.auth.next(auth);
  }
}
