import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RentPost } from '../../interfaces/rent-post';
import { User } from '../../interfaces/user';
import { DataService } from '../../services/data.service';
import { Store } from '@ngrx/store';
import { logOut } from '../../shared/logedin-user/logedin-user.actions';
import { catchError, ignoreElements, Observable, of } from 'rxjs';

@Component({
  selector: 'app-private-profile',
  templateUrl: './private-profile.component.html',
  styleUrl: './private-profile.component.css',
})
export class PrivateProfileComponent implements OnInit {
  constructor(
    private dataServices: DataService,
    private cookieService: CookieService,
    private router: Router,
    private store: Store<{ loggedInUser: { loggedInUser: User } }>
  ) {}
  username: string = this.cookieService.get('username');
  isLogOutBtnDisabled: boolean = false;

  user$: Observable<User> | undefined;
  userError$: Observable<string> | undefined;

  userRentPosts$: Observable<RentPost[]> | undefined;
  userRentPostsError$: Observable<string> | undefined;

  ngOnInit(): void {
    if (this.username) {
      setTimeout(() => {
        // -----------------
        this.user$ = this.dataServices.getUserByUsername(
          this.username as string
        );
        this.userRentPostsError$ = this.user$.pipe(
          ignoreElements(),
          catchError((error) => {
            return of(
              error.status == 0
                ? 'Server is not responding'
                : error.error?.message
                ? error.error.message
                : error.error
                ? error.error
                : 'Something went wrong'
            );
          })
        );
        // -----------------
      }, 500);

      setTimeout(() => {
        // -----------------
        this.userRentPosts$ = this.dataServices.getRentPostByUsername(
          this.username as string
        );
        this.userRentPostsError$ = this.userRentPosts$.pipe(
          ignoreElements(),
          catchError((error) => {
            return of(
              error.status == 0
                ? 'Server is not responding'
                : error.error?.message
                ? error.error.message
                : error.error
                ? error.error
                : 'Something went wrong'
            );
          })
        );
        // -----------------
      }, 1000);
    }
  }

  onLogOutClick() {
    this.isLogOutBtnDisabled = true;
    this.cookieService.delete('username');
    setTimeout(() => {
      this.store.dispatch(logOut());
      this.router.navigate(['/login']);
    }, 1000);
  }
}
