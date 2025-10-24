import { createReducer, on } from '@ngrx/store';
import { UserState, initialUserState, userAdapter } from './user.state';
import * as UserActions from './user.actions';

export const userReducer = createReducer(
  initialUserState,

  on(UserActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(UserActions.loadUsersSuccess, (state, { users }) =>
    userAdapter.setAll(users, {
      ...state,
      loading: false
    })
  ),

  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(UserActions.addUser, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(UserActions.addUserSuccess, (state, { user }) =>
    userAdapter.upsertOne(user, {
      ...state,
      loading: false
    })
  ),

  on(UserActions.addUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(UserActions.updateUser, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(UserActions.updateUserSuccess, (state, { user }) =>
    userAdapter.updateOne(
      { id: user.id, changes: user },
      {
        ...state,
        loading: false
      }
    )
  ),

  on(UserActions.updateUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(UserActions.deleteUser, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(UserActions.deleteUserSuccess, (state, { userId }) =>
    userAdapter.removeOne(userId, {
      ...state,
      loading: false
    })
  ),

  on(UserActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(UserActions.selectUser, (state, { userId }) => ({
    ...state,
    selectedUserId: userId,
    userDetails: null
  })),

  on(UserActions.loadUserDetails, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(UserActions.loadUserDetailsSuccess, (state, { userDetails }) => ({
    ...state,
    userDetails,
    loading: false
  })),

  on(UserActions.loadUserDetailsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
