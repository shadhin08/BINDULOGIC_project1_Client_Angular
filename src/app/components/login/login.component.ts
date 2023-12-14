import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Message, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { login } from '../../shared/logedin-user/logedin-user.actions';
import { User } from '../../interfaces/user';
import { Observable, catchError, ignoreElements, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  constructor(
    private dataServices: DataService,
    private router: Router,
    private store: Store<{ logedInUser: { logedInUser: User } }>,
    private messageService: MessageService
  ) {}

  showTopCenter(messages: Message) {
    this.messageService.add({
      key: 'tc',
      severity: messages.severity,
      summary: messages.summary,
      detail: messages.detail,
    });
  }

  // ------------------------------------------------

  loginMessages: Message[] = [];

  ngOnInit() {}

  username: string | undefined;
  password: string | undefined;
  isLoginBtnDisabled: boolean = false;

  // logedInUser$: Observable<User> | undefined;
  // logedInUserError$: Observable<string> | undefined;

  onLoginClick() {
    this.isLoginBtnDisabled = true;

    if (this.username && this.password) {
      // this.logedInUser$ = this.dataServices.userLogin(
      //   this.username,
      //   this.password
      // );

      // this.logedInUserError$ = this.logedInUser$.pipe(
      //   ignoreElements(),
      //   catchError((error) => {
      //     return of(
      //       error.status == 0
      //         ? 'Server is not responding'
      //         : error.error?.message
      //         ? error.error.message
      //         : error.error
      //         ? error.error
      //         : 'Something went wrong'
      //     );
      //   })
      // );

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
            this.showTopCenter(this.loginMessages[0]);
            this.store.dispatch(login({ username: result.username as string }));
            setTimeout(() => {
              this.isLoginBtnDisabled = false;
              this.router.navigate(['/private-profile']);
            }, 500);
          }
        },
        (error) => {
          this.loginMessages = [
            {
              severity: 'error',
              summary: 'Error',
              detail:
                error.status == 0
                  ? 'Server is not responding'
                  : error.error?.message
                  ? error.error.message
                  : error.error
                  ? error.error
                  : 'Something went wrong',
            },
          ];
          this.showTopCenter(this.loginMessages[0]);
          this.isLoginBtnDisabled = false;
        }
      );
    } else {
      this.loginMessages = [
        {
          severity: 'error',
          summary: 'Error',
          detail: 'Please enter username and password',
        },
      ];
      this.showTopCenter(this.loginMessages[0]);
      this.isLoginBtnDisabled = false;
    }
  }
}
