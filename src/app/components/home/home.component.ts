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
  errorMessage: string | undefined;

  constructor(private dataServices: DataService) {}

  ngOnInit(): void {
    this.dataServices.getAllRentPost().subscribe(
      (result) => {
        this.rentPosts = result;
      },
      (error) => {
        console.log(error);
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
