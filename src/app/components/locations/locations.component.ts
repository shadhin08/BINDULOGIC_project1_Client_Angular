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
  constructor(private dataServices: DataService) {}

  ngOnInit(): void {
    this.dataServices.getAllRentArea().subscribe((locations) => {
      this.locations = locations;
    });
    console.log(this.locations);
  }
}
