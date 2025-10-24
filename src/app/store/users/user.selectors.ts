import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState, userAdapter } from './user.state';
import { selectAllOrders } from '../orders/order.selectors';

export const selectUserState = createFeatureSelector<UserState>('users');

const { selectAll, selectEntities, selectIds, selectTotal } = userAdapter.getSelectors();

export const selectAllUsers = createSelector(
  selectUserState,
  selectAll
);

export const selectUserEntities = createSelector(
  selectUserState,
  selectEntities
);

export const selectUserIds = createSelector(
  selectUserState,
  selectIds
);

export const selectUserTotal = createSelector(
  selectUserState,
  selectTotal
);

export const selectSelectedUserId = createSelector(
  selectUserState,
  (state) => state.selectedUserId
);

export const selectUserDetails = createSelector(
  selectUserState,
  (state) => state.userDetails
);

export const selectUserLoading = createSelector(
  selectUserState,
  (state) => state.loading
);

export const selectUserError = createSelector(
  selectUserState,
  (state) => state.error
);

export const selectSelectedUser = createSelector(
  selectUserEntities,
  selectSelectedUserId,
  (entities, selectedId) => {
    return selectedId !== null ? entities[selectedId] || null : null;
  }
);

export const selectSelectedUserOrders = createSelector(
  selectSelectedUserId,
  selectAllOrders,
  (selectedUserId, allOrders) => {
    if (selectedUserId === null) return [];
    return allOrders.filter(order => order.userId === selectedUserId);
  }
);

export const selectUserSummary = createSelector(
  selectSelectedUser,
  selectSelectedUserOrders,
  (user, orders) => {
    return {
      name: user?.name || '',
      totalOrders: orders.reduce((sum, order) => sum + order.total, 0)
    };
  }
);
