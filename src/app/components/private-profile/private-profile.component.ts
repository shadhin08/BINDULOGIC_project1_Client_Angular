import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RentPost } from '../../interfaces/rent-post';
import { User } from '../../interfaces/user';
import { DataService } from '../../services/data.service';
import { Store } from '@ngrx/store';
import { logOut } from '../../shared/logedin-user/logedin-user.actions';

@Component({
  selector: 'app-private-profile',
  templateUrl: './private-profile.component.html',
  styleUrl: './private-profile.component.css',
})
export class PrivateProfileComponent implements OnInit {
  user: User | undefined;
  userRentPosts: RentPost[] = [];

  userErrorMessage: string | undefined;
  rentPostErrorMessage: string | undefined;

  constructor(
    private dataServices: DataService,
    private cookieService: CookieService,
    private router: Router,
    private store: Store<{ loggedInUser: { loggedInUser: User } }>
  ) {}
  username: string = this.cookieService.get('username');
  isLogOutBtnDisabled: boolean = false;

  ngOnInit(): void {
    this.dataServices.getUserByUsername(this.username).subscribe(
      (user) => {
        this.user = user;
      },
      (error) => {
        if (error.status === 0) {
          this.userErrorMessage = 'Server is not responding';
        } else {
          this.userErrorMessage = error.error?.message
            ? error.error.message
            : error.error
            ? error.error
            : 'Something went wrong';
        }
      }
    );
    this.dataServices.getRentPostByUsername(this.username).subscribe(
      (rentPosts) => {
        this.userRentPosts = rentPosts;
      },
      (error) => {
        if (error.status === 0) {
          this.rentPostErrorMessage = 'Server is not responding';
        } else {
          this.rentPostErrorMessage = error.error?.message
            ? error.error.message
            : error.error
            ? error.error
            : 'Something went wrong';
        }
      }
    );
  }

  onLogOutClick() {
    this.cookieService.delete('username');
    this.store.dispatch(logOut());
    this.isLogOutBtnDisabled = true;
    this.router.navigate(['/login']);
  }
}
