import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { CreateRentPostComponent } from './components/create-rent-post/create-rent-post.component';
import { HomeComponent } from './components/home/home.component';
import { LocationDetailsComponent } from './components/location-details/location-details.component';
import { LocationsComponent } from './components/locations/locations.component';
import { LoginComponent } from './components/login/login.component';
import { PrivateProfileComponent } from './components/private-profile/private-profile.component';
import { UserComponent } from './components/user/user.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'private-profile', component: PrivateProfileComponent },
  { path: 'users', component: UsersComponent },
  { path: 'user/:username', component: UserComponent },
  { path: 'locations', component: LocationsComponent },
  { path: 'location/:area', component: LocationDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: CreateAccountComponent },
  {
    path: 'private-profile/create-rent-post',
    component: CreateRentPostComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
