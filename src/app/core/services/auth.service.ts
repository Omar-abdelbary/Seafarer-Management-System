import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { envieonment } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // injection service Http client to use apis

  private readonly _HttpClient = inject(HttpClient) ;


  



  // login

login(loginInfo: any): Observable<any> {
  const body = new URLSearchParams();
  body.set('username', loginInfo.username);
  body.set('Password', loginInfo.Password);
  body.set('grant_type', 'password');
  body.set('mobileid', '9cb2fcb2de1c71e8');

  return this._HttpClient.post(`${envieonment.base_Url}/token`, body.toString(), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  }) ;





}










}
