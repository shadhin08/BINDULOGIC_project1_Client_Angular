import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RentPost } from '../../interfaces/rent-post';
import { User } from '../../interfaces/user';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-private-profile',
  templateUrl: './private-profile.component.html',
  styleUrl: './private-profile.component.css',
})
export class PrivateProfileComponent implements OnInit {
  user: User | undefined;
  userRentPosts: RentPost[] = [];

  constructor(
    private dataServices: DataService,
    private cookieService: CookieService,
    private router: Router
  ) {}
  username: string = this.cookieService.get('username');
  isLogOutBtnDisabled: boolean = false;

  ngOnInit(): void {
    this.dataServices.getUserByUsername(this.username).subscribe((user) => {
      this.user = user;
    });
    this.dataServices
      .getRentPostByUsername(this.username)
      .subscribe((rentPosts) => {
        this.userRentPosts = rentPosts;
      });
  }

  onLogOutClick() {
    this.cookieService.delete('username');
    this.isLogOutBtnDisabled = true;
    this.router.navigate(['/login']);
  }
}
