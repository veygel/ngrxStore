import { createReducer, on } from '@ngrx/store';
import { OrderState, initialOrderState, orderAdapter } from './order.state';
import * as OrderActions from './order.actions';

export const orderReducer = createReducer(
  initialOrderState,

  on(OrderActions.loadOrders, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(OrderActions.loadOrdersSuccess, (state, { orders }) =>
    orderAdapter.setAll(orders, {
      ...state,
      loading: false
    })
  ),

  on(OrderActions.loadOrdersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(OrderActions.addOrder, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(OrderActions.addOrderSuccess, (state, { order }) =>
    orderAdapter.addOne(order, {
      ...state,
      loading: false
    })
  ),

  on(OrderActions.addOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(OrderActions.updateOrder, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(OrderActions.updateOrderSuccess, (state, { order }) =>
    orderAdapter.updateOne(
      { id: order.id, changes: order },
      {
        ...state,
        loading: false
      }
    )
  ),

  on(OrderActions.updateOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(OrderActions.deleteOrder, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(OrderActions.deleteOrderSuccess, (state, { orderId }) =>
    orderAdapter.removeOne(orderId, {
      ...state,
      loading: false
    })
  ),

  on(OrderActions.deleteOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
