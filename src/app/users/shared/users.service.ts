import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { map, Observable } from 'rxjs';
import { User } from './user.model';
import * as UsersApi from './misc/users-api-types';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private USERS_URL = `${environment.BASE_URL}/users`;

  constructor(private http: HttpClient) {}

  private mapServerUserData(serverUser: UsersApi.UserData): User {
    const { first_name, last_name, ...unchangedKeys } = serverUser;
    return {
      ...unchangedKeys,
      firstName: first_name,
      lastName: last_name,
    };
  }

  getTotalPages(): Observable<number> {
    return this.http
      .get<UsersApi.GetUserList>(this.USERS_URL)
      .pipe(map((x) => x.total_pages));
  }

  getUsers({ page }: { page?: number } = {}): Observable<User[]> {
    const httpOptions = {
      params: new HttpParams(),
    };

    if (page !== undefined) {
      httpOptions.params = httpOptions.params.set('page', page);
    }

    return this.http
      .get<UsersApi.GetUserList>(`${this.USERS_URL}`, httpOptions)
      .pipe(map((res) => res.data.map(this.mapServerUserData)));
  }

  getUser(id: number): Observable<User> {
    return this.http
      .get<UsersApi.GetUserSingle>(`${this.USERS_URL}/${id}`)
      .pipe(map((res) => this.mapServerUserData(res.data)));
  }
}
