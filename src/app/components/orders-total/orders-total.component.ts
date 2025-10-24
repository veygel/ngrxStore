import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserSummary } from '../../store/users';

@Component({
  selector: 'app-orders-total',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders-total.component.html',
  styleUrl: './orders-total.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersTotalComponent {
  public userSummary$: Observable<{ name: string; totalOrders: number }>;

  constructor(private store: Store) {
    this.userSummary$ = this.store.select(selectUserSummary);
  }
}
