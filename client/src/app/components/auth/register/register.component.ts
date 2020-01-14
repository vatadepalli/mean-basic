import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  user = { username: "", password: "", email: null, name: null };
  invalidRegister = false;
  registered = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  onSubmit() {
    this.registered = false;
    this.invalidRegister = false;

    this.authService
      .register(
        this.user.username,
        this.user.password,
        this.user.name,
        this.user.email
      )
      .subscribe(
        data => {
          //  this.router.navigate(['']);
          //  this.invalidRegister = false;
          if (data === true) {
            this.registered = true;
          } else {
            this.invalidRegister = true;
          }
        },
        error => {
          this.invalidRegister = true;
        }
      );
  }
}
