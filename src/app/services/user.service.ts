import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { User } from '../models/user.model';
import { Order } from '../models/order.model';
import usersData from '../../mock-data/users.json';
import ordersData from '../../mock-data/orders.json';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private mockUsers: User[] = usersData;
  private mockOrders: Order[] = ordersData;

  constructor() { }

  public getUsers(): Observable<User[]> {
    return of(this.mockUsers).pipe(
      delay(500)
    );
  }

  public getOrders(): Observable<Order[]> {
    return of(this.mockOrders).pipe(
      delay(500)
    );
  }

  public getUserDetails(userId: number): Observable<User | undefined> {
    const user = this.mockUsers.find(user => user.id === userId);
    return of(user).pipe(
      delay(1000)
    );
  }

  public addUser(user: User): Observable<User> {
    return of(user).pipe(
      delay(300)
    );
  }

  public updateUser(user: User): Observable<User> {
    return of(user).pipe(
      delay(300)
    );
  }

  public deleteUser(userId: number): Observable<number> {
    return of(userId).pipe(
      delay(300)
    );
  }
}
