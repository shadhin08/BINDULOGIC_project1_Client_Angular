import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { catchError, ignoreElements, Observable, of } from 'rxjs';
import { City } from '../../interfaces/location';
import { RentPost } from '../../interfaces/rent-post';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrl: './location-details.component.css',
})
export class LocationDetailsComponent implements OnInit {
  routerLocation: string | undefined;
  routerEvents: any;

  constructor(private dataServices: DataService, private router: Router) {
    this.routerEvents = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.routerLocation = event.url.split('/')[2];
      }
    });
  }

  rentArea$: Observable<City> | undefined;
  rentAreaError$: Observable<string> | undefined;

  rentPostsByArea$: Observable<RentPost[]> | undefined;
  rentPostsByAreaError$: Observable<string> | undefined;

  ngOnInit(): void {
    if (this.routerLocation) {
      setTimeout(() => {
        //--------------------
        this.rentArea$ = this.dataServices.getRentAreaByName(
          this.routerLocation as string
        );
        this.rentAreaError$ = this.rentArea$.pipe(
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

        //---------------
      }, 500);
      // ------------------------------------------
      // ------------------------------------------
      setTimeout(() => {
        //---------------
        this.rentPostsByArea$ = this.dataServices.getRentPostByArea(
          this.routerLocation as string
        );
        this.rentPostsByAreaError$ = this.rentPostsByArea$.pipe(
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
        //---------------
      }, 1000);
    }
  }
}
