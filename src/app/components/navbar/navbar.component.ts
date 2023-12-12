import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../../interfaces/user';
import { login } from '../../shared/logedin-user/logedin-user.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  currentRoute: string = '/';
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private store: Store<{ logedInUser: { logedInUser: User } }>
  ) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  items: MenuItem[] | undefined;
  logedinUser: boolean = this.cookieService.check('username');

  isLogedIn: boolean = false;
  activeItem: MenuItem | undefined;

  navItems() {
    this.store.select('logedInUser').subscribe((data: any) => {
      if (data) {
        this.isLogedIn = data.isLogedin;
      }
    });
    this.logedinUser = this.isLogedIn;
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: '/' },
      { label: 'Users', icon: 'pi pi-fw pi-users', routerLink: '/users' },
      {
        label: 'Locations',
        icon: 'pi pi-fw pi-location',
        routerLink: '/locations',
      },
      {
        label: this.logedinUser ? 'Profile' : 'Login',
        icon: 'pi pi-fw pi-user',
        routerLink: this.logedinUser ? '/private-profile' : '/login',
      },
    ];
    this.activeItem = this.items[0];

    this.activateLast();
  }

  ngOnInit(): void {
    const username = this.cookieService.get('username');
    if (username) {
      this.store.dispatch(login({ username: username }));
    }
    this.navItems();
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
    this.logedinUser = false;
  }

  async activateLast() {
    this.activeItem = (this.items as MenuItem[])[
      (this.items as MenuItem[]).length - 1
    ];
  }
}
