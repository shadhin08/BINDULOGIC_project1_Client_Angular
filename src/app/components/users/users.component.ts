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
  constructor(private dataServices: DataService) {}

  ngOnInit(): void {
    this.dataServices.getAllUser().subscribe((users) => {
      this.users = users;
    });
  }
}
