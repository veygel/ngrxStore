import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderState, orderAdapter } from './order.state';

export const selectOrderState = createFeatureSelector<OrderState>('orders');

const { selectAll, selectEntities, selectIds, selectTotal } = orderAdapter.getSelectors();

export const selectAllOrders = createSelector(
  selectOrderState,
  selectAll
);

export const selectOrderEntities = createSelector(
  selectOrderState,
  selectEntities
);

export const selectOrderIds = createSelector(
  selectOrderState,
  selectIds
);

export const selectOrderTotal = createSelector(
  selectOrderState,
  selectTotal
);

export const selectOrderLoading = createSelector(
  selectOrderState,
  (state) => state.loading
);

export const selectOrderError = createSelector(
  selectOrderState,
  (state) => state.error
);
