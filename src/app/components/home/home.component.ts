import { Component, OnInit } from '@angular/core';
import { RentPost } from '../../interfaces/rent-post';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  rentPosts: RentPost[] = [];

  constructor(private dataServices: DataService) {}

  ngOnInit(): void {
    this.dataServices.getAllRentPost().subscribe((rentPosts) => {
      this.rentPosts = rentPosts;
    });
  }
}
