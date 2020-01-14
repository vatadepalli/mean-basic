import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  LoggedIn: boolean = false;
  constructor(private httpClient: HttpClient) {}

  public isLoggedIn() {
    return this.LoggedIn;
  }

  public logout() {
    this.LoggedIn = false;
  }

  public validateUser(username, password) {
    return this.httpClient
      .post<any>("http://localhost:9090/users/authenticate", {
        username,
        password
      })
      .pipe(
        map(data => {
          if (data.success === true) {
            this.LoggedIn = true;
            return true;
          } else {
            this.LoggedIn = false;
            return false;
          }
        })
      );
  }

  public register(username, password, name, email) {
    return this.httpClient
      .post<any>("http://localhost:9090/users/register", {
        username,
        password,
        name,
        email
      })
      .pipe(
        map(data => {
          console.log(data);
          if (data.success === true) {
            return true;
          } else {
            return false;
          }
        })
      );
  }
}
