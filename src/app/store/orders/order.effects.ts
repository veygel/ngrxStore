import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import * as OrderActions from './order.actions';

@Injectable()
export class OrderEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);
  private store = inject(Store);

  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.loadOrders),
      switchMap(() =>
        this.userService.getOrders().pipe(
          map(orders => OrderActions.loadOrdersSuccess({ orders })),
          catchError(error => of(OrderActions.loadOrdersFailure({ error: error.message })))
        )
      )
    )
  );

  addOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.addOrder),
      switchMap(({ order }) =>
        of(order).pipe(
          map(addedOrder => OrderActions.addOrderSuccess({ order: addedOrder })),
          catchError(error => of(OrderActions.addOrderFailure({ error: error.message })))
        )
      )
    )
  );

  updateOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.updateOrder),
      switchMap(({ order }) =>
        of(order).pipe(
          map(updatedOrder => OrderActions.updateOrderSuccess({ order: updatedOrder })),
          catchError(error => of(OrderActions.updateOrderFailure({ error: error.message })))
        )
      )
    )
  );

  deleteOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.deleteOrder),
      switchMap(({ orderId }) =>
        of(orderId).pipe(
          map(() => OrderActions.deleteOrderSuccess({ orderId })),
          catchError(error => of(OrderActions.deleteOrderFailure({ error: error.message })))
        )
      )
    )
  );
}
