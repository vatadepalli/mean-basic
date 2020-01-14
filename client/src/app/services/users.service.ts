import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  public getUserList() {
    return this.httpClient.get<any>('http://localhost:9090/users/list');
  }
}
