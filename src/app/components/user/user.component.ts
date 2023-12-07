import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RentPost } from '../../interfaces/rent-post';
import { User } from '../../interfaces/user';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  user: User | undefined;
  userRentPosts: RentPost[] = [];
  username: string | undefined;

  routerEvents: any;
  constructor(private dataServices: DataService, private router: Router) {
    this.routerEvents = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.username = event.url.split('/')[2];
      }
    });
  }

  ngOnInit(): void {
    if (this.username) {
      this.dataServices.getUserByUsername(this.username).subscribe((user) => {
        this.user = user;
      });
      this.dataServices
        .getRentPostByUsername(this.username)
        .subscribe((rentPosts) => {
          this.userRentPosts = rentPosts;
        });
    }
  }
}
