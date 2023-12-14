import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { City } from '../../interfaces/location';
import { catchError, ignoreElements, Observable, of } from 'rxjs';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.css',
})
export class LocationsComponent implements OnInit {
  constructor(private dataServices: DataService) {}

  allRentArea$: Observable<City[]> | undefined;
  allRentAreaError$: Observable<string> | undefined;

  ngOnInit(): void {
    setTimeout(() => {
      // ------------------
      this.allRentArea$ = this.dataServices.getAllRentArea();
      this.allRentAreaError$ = this.allRentArea$.pipe(
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
