import { createAction, props } from '@ngrx/store';
import { Order } from '../../models/order.model';

export const loadOrders = createAction(
  '[Order API] Load Orders'
);

export const loadOrdersSuccess = createAction(
  '[Order API] Load Orders Success',
  props<{ orders: Order[] }>()
);

export const loadOrdersFailure = createAction(
  '[Order API] Load Orders Failure',
  props<{ error: string }>()
);

export const addOrder = createAction(
  '[Order Component] Add Order',
  props<{ order: Order }>()
);

export const addOrderSuccess = createAction(
  '[Order API] Add Order Success',
  props<{ order: Order }>()
);

export const addOrderFailure = createAction(
  '[Order API] Add Order Failure',
  props<{ error: string }>()
);

export const updateOrder = createAction(
  '[Order Component] Update Order',
  props<{ order: Order }>()
);

export const updateOrderSuccess = createAction(
  '[Order API] Update Order Success',
  props<{ order: Order }>()
);

export const updateOrderFailure = createAction(
  '[Order API] Update Order Failure',
  props<{ error: string }>()
);

export const deleteOrder = createAction(
  '[Order Component] Delete Order',
  props<{ orderId: number }>()
);

export const deleteOrderSuccess = createAction(
  '[Order API] Delete Order Success',
  props<{ orderId: number }>()
);

export const deleteOrderFailure = createAction(
  '[Order API] Delete Order Failure',
  props<{ error: string }>()
);
