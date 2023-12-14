import { Component, OnInit } from '@angular/core';
import { catchError, ignoreElements, map, Observable, of } from 'rxjs';
import { RentPost } from '../../interfaces/rent-post';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private dataServices: DataService) {}

  allRentPosts$: Observable<RentPost[]> | undefined;
  allRentPostsError$: Observable<string> | undefined;

  ngOnInit(): void {
    setTimeout(() => {
      this.allRentPosts$ = this.dataServices.getAllRentPost();
      this.allRentPostsError$ = this.allRentPosts$.pipe(
        ignoreElements(),
        catchError((error) => {
          console.log(error);
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
    }, 500);
  }
}
