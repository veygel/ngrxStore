import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllUsers, selectUser } from '../../store/users';
import { User } from '../../models/user.model';
import { UserComponent } from '../user/user.component';
import { OrdersTotalComponent } from '../orders-total/orders-total.component';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [CommonModule, UserComponent, OrdersTotalComponent],
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.scss'
})
export class UserOrdersComponent implements OnInit {
  public users$: Observable<User[]>;

  constructor(private store: Store) {
    this.users$ = this.store.select(selectAllUsers);
  }

  ngOnInit(): void {}

  public onSelectUser(userId: number): void {
    this.store.dispatch(selectUser({ userId }));
  }
}
