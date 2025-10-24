import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState, userAdapter } from './user.state';

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
    return null;
  }
);

export const selectSelectedUserOrders = createSelector(
  selectSelectedUserId,
  (selectedUserId) => {
    return [];
  }
);

export const selectUserSummary = createSelector(
  selectSelectedUser,
  selectSelectedUserOrders,
  (user, orders) => {
    return {
      name: '',
      totalOrders: 0
    };
  }
);
