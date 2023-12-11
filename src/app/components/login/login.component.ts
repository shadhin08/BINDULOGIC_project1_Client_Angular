import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Message } from 'primeng/api';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { getUser } from '../../shared/logedin-user/loggedin-user.selectors';
import { login } from '../../shared/logedin-user/logedin-user.actions';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(
    private dataServices: DataService,
    private router: Router,
    private store: Store<{ loggedInUser: { loggedInUser: User } }>
  ) {}

  loginMessages: Message[] = [];
  x$: any;

  ngOnInit() {}

  username: string | undefined;
  password: string | undefined;
  isLoginBtnDisabled: boolean = false;

  onLoginClick() {
    this.isLoginBtnDisabled = true;

    if (this.username && this.password) {
      this.dataServices.userLogin(this.username, this.password).subscribe(
        (result) => {
          if (result) {
            this.loginMessages = [
              {
                severity: 'success',
                summary: 'Success',
                detail: 'Login Success',
              },
            ];

            this.store.dispatch(login({ username: result.username }));

            this.store.select('loggedInUser').subscribe((data) => {
              console.log('dta', data);
              if (data) {
                console.log(data);
              } else console.log('no user');
            });
            this.isLoginBtnDisabled = false;
            // this.router.navigate(['/private-profile']);
          }
        },
        (error) => {
          if (error.status === 0) {
            this.loginMessages = [
              { severity: 'error', summary: 'Error', detail: 'Server error' },
            ];
          } else {
            this.loginMessages = [
              { severity: 'error', summary: 'Error', detail: error.error },
            ];
          }

          this.isLoginBtnDisabled = false;
        }
      );
      this.isLoginBtnDisabled = false;
    } else {
      this.loginMessages = [
        {
          severity: 'error',
          summary: 'Error',
          detail: 'Please enter username and password',
        },
      ];
      this.isLoginBtnDisabled = false;
    }
  }
}
