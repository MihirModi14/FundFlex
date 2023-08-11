import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  googleLogin: boolean = false;
  notification: string = '';
  
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe((auth) => {
      if(auth) {
        this.router.navigate(['/'])
      }
    });
  }

  onSubmit(): void {
    if(this.googleLogin) {
      this.authService.loginUsingGoogle();
    } else {
      this.authService.loginUsingEmail(this.email, this.password)
      .catch((err) => {
        this.notification = err.message;

        setTimeout(() => {
          this.notification='';
        },2000)
      });
    }
  }

}
