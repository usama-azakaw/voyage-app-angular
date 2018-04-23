import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { environment } from '../../../environments/environment';
import { User } from './user.model';
import { UserStatus } from './user-status.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
  currentUser: User;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${environment.API_URL}/users`);
  }

  getCurrentUser(force = false): Observable<User> {
    if (this.currentUser != null && !force) {
      return Observable.of(this.currentUser);
    }
    return this.http.get<User>(`${environment.API_URL}/profiles/me`)
      .map(response => {
        const currentUser = response;
        this.currentUser = currentUser;
        return currentUser;
      });
  }

  toggleStatus(userId: string, status: UserStatus): Observable<User> {
    return this.http.put<User>(`${environment.API_URL}/users/${userId}/account-status`, status);
  }

  updateProfile(user: User): Observable<User> {
    return this.http.put<User>(`${environment.API_URL}/profiles/me`, user);
  }
}
