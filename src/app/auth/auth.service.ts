/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from './user.model';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url='http://localhost/php-api-oop/auth-file ';
  constructor(private http: HttpClient) { }

  register(user: User){
    return this.http.post(`${this.url}/create-user`,user);

  }
  login(credentials: User): Observable<string>
  {
    return this.http.post<{token: string}>(`${this.url}/login_user`,credentials).pipe(
      map(response => response.token)
    );
  }
}
