import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RentPost } from '../interfaces/rent-post';
import { User } from '../interfaces/user';
import { City } from '../interfaces/location';

const httpOptions = {
  mode: 'cors',
  credentials: 'include',
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  withCredentials: true,
};
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:3030';
  constructor(private http: HttpClient) {}

  createRentPost(rentPost: RentPost): Observable<RentPost> {
    const url = `${this.apiUrl}/rent-post`;
    return this.http.post<RentPost>(url, rentPost, httpOptions);
  }
  getAllRentPost(): Observable<RentPost[]> {
    const url = `${this.apiUrl}/rent-post`;
    return this.http.get<RentPost[]>(url);
  }
  getRentPostByUsername(username: string): Observable<RentPost[]> {
    if (username) {
      const url = `${this.apiUrl}/rent-post/user/${username}`;
      return this.http.get<RentPost[]>(url);
    } else {
      const dummyUser = 'user1';
      const url = `${this.apiUrl}/rent-post/user/${dummyUser}`;
      return this.http.get<RentPost[]>(url);
    }
  }

  createAccount(user: User): Observable<User> {
    const url = `${this.apiUrl}/user`;
    return this.http.post<User>(url, user, httpOptions);
  }
  userLogin(username: string, password: string): Observable<User> {
    // const userCredentials = { username, password };
    const url = `${this.apiUrl}/auth/login`;
    return this.http.post<User>(url, { username, password }, httpOptions);
  }

  getUserByUsername(username: string): Observable<User> {
    const url = `${this.apiUrl}/user/${username}`;
    return this.http.get<User>(url);
  }

  getAllRentArea(): Observable<City[]> {
    const url = `${this.apiUrl}/rent-area`;
    return this.http.get<City[]>(url);
  }
  getRentAreaByName(name: string): Observable<City> {
    const url = `${this.apiUrl}/rent-area/${name}`;
    return this.http.get<City>(url);
  }
  getRentPostByArea(name: string): Observable<RentPost[]> {
    const url = `${this.apiUrl}/rent-post/area/${name}`;
    return this.http.get<RentPost[]>(url);
  }
  getAllUser(): Observable<User[]> {
    const url = `${this.apiUrl}/user`;
    return this.http.get<User[]>(url);
  }
}
