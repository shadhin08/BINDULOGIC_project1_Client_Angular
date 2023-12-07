import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  currentRoute: string = '/';
  constructor(private cookieService: CookieService, private router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  items: MenuItem[] | undefined;
  logedinUser: boolean = this.cookieService.check('username');

  activeItem: MenuItem | undefined;

  ngOnInit() {
    this.logedinUser = this.cookieService.check('username');
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

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }

  async activateLast() {
    this.activeItem = (this.items as MenuItem[])[
      (this.items as MenuItem[]).length - 1
    ];
  }
}
