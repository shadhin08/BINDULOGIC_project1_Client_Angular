import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { City } from '../../interfaces/location';
import { RentPost } from '../../interfaces/rent-post';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrl: './location-details.component.css',
})
export class LocationDetailsComponent implements OnInit {
  locationRentPosts: RentPost[] = [];
  location: City | undefined;
  routerLocation: string | undefined;
  routerEvents: any;
  areaErrorMessage: string | undefined;
  postErrorMessage: string | undefined;

  constructor(private dataServices: DataService, private router: Router) {
    this.routerEvents = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.routerLocation = event.url.split('/')[2];
      }
    });
  }

  ngOnInit(): void {
    if (this.routerLocation) {
      this.dataServices.getRentAreaByName(this.routerLocation).subscribe(
        (location) => {
          this.location = location;
        },
        (error) => {
          if (error.status === 0) {
            this.areaErrorMessage = 'Server is not responding';
          } else {
            this.areaErrorMessage = error.error?.message
              ? error.error.message
              : error.error
              ? error.error
              : 'Something went wrong';
          }
        }
      );
      this.dataServices.getRentPostByArea(this.routerLocation).subscribe(
        (rentPosts) => {
          this.locationRentPosts = rentPosts;
        },
        (error) => {
          if (error.status === 0) {
            this.postErrorMessage = 'Server is not responding';
          } else {
            this.postErrorMessage = error.error?.message
              ? error.error.message
              : error.error
              ? error.error
              : 'Something went wrong';
          }
        }
      );
    }
  }
}
