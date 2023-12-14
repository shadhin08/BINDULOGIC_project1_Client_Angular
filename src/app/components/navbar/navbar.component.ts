import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../../interfaces/user';
import { login } from '../../shared/logedin-user/logedin-user.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private store: Store<{ logedInUser: { logedInUser: User } }>
  ) {
    router.events.subscribe(async (url: any) => {
      if (url instanceof NavigationEnd) {
        const activeNumber =
          url.url === '/'
            ? 0
            : url.url === '/users'
            ? 1
            : url.url === '/locations'
            ? 2
            : url.url === '/private-profile' || url.url === '/login'
            ? 3
            : 4;
        this.activeNavItem(activeNumber);
      }
    });
  }
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;

  isLogedIn: boolean = false;
  activeNavItem(value: number) {
    if (this.items != undefined) {
      this.activeItem = this.items[value];
    }
  }
  navItems() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        url: '/',
      },
      {
        label: 'Users',
        icon: 'pi pi-fw pi-users',
        url: '/users',
      },
      {
        label: 'Locations',
        icon: 'pi pi-fw pi-location',
        url: '/locations',
      },
      {
        label: this.isLogedIn ? 'Profile' : 'Login',
        icon: 'pi pi-fw pi-user',
        url: this.isLogedIn ? '/private-profile' : '/login',
      },
    ];
  }
  loginSub: any | undefined = undefined;
  ngOnInit(): void {
    const username = this.cookieService.get('username');
    if (username) {
      this.store.dispatch(login({ username: username }));
    }
    this.loginSub = this.store.select('logedInUser').subscribe((data: any) => {
      if (data) {
        this.isLogedIn = data.isLogedin;
        this.navItems();
      }
    });
    this.navItems();
  }
  ngOnDestroy(): void {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }
}
