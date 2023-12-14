import { Component, OnInit } from '@angular/core';
import { catchError, ignoreElements, Observable, of } from 'rxjs';
import { User } from '../../interfaces/user';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  constructor(private dataServices: DataService) {}

  allUser$: Observable<User[]> | undefined;
  allUserError$: Observable<string> | undefined;

  ngOnInit(): void {
    setTimeout(() => {
      // ------------------
      this.allUser$ = this.dataServices.getAllUser();
      this.allUserError$ = this.allUser$.pipe(
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
      // ------------------
    }, 500);
  }
}
