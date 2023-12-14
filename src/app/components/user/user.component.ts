import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { catchError, ignoreElements, Observable, of } from 'rxjs';
import { RentPost } from '../../interfaces/rent-post';
import { User } from '../../interfaces/user';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  username: string | undefined;

  routerEvents: any;
  constructor(private dataServices: DataService, private router: Router) {
    this.routerEvents = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.username = event.url.split('/')[2];
      }
    });
  }
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
}
