import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  errorMessage: string | undefined;
  constructor(private dataServices: DataService) {}

  ngOnInit(): void {
    this.dataServices.getAllUser().subscribe(
      (result) => {
        this.users = result;
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
