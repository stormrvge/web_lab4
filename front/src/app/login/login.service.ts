import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';

export interface User {
  username: string;
  password: string;
}

@Injectable({providedIn: 'root'})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(user: User): Observable<any> { // to do return type NOT any
    const body = {username: user.username, password: user.password};
    return this.http.post<Observable<boolean>>('http://localhost:8080/rest/login', body, {
      observe: 'response', withCredentials: true});
  }

  register(user: User): Observable<any> {
    const body = {username: user.username, password: user.password};

    return this.http.post('http://localhost:8080/rest/registration', body);
  }

}
