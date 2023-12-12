import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { City } from '../../interfaces/location';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.css',
})
export class LocationsComponent implements OnInit {
  locations: City[] = [];
  errorMessage: string | undefined;
  constructor(private dataServices: DataService) {}

  ngOnInit(): void {
    this.dataServices.getAllRentArea().subscribe(
      (result) => {
        this.locations = result;
      },
      (error) => {
        if (error.status === 0) {
          this.errorMessage = 'Server is not responding';
        } else {
          this.errorMessage = error.error?.message
            ? error.error.message
            : error.error
            ? error.error
            : 'Something went wrong';
        }
      }
    );
  }
}
