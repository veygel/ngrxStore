import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const loadUsers = createAction(
  '[User API] Load Users'
);

export const loadUsersSuccess = createAction(
  '[User API] Load Users Success',
  props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
  '[User API] Load Users Failure',
  props<{ error: string }>()
);

export const addUser = createAction(
  '[User Component] Add User',
  props<{ user: User }>()
);

export const addUserSuccess = createAction(
  '[User API] Add User Success',
  props<{ user: User }>()
);

export const addUserFailure = createAction(
  '[User API] Add User Failure',
  props<{ error: string }>()
);

export const updateUser = createAction(
  '[User Component] Update User',
  props<{ user: User }>()
);

export const updateUserSuccess = createAction(
  '[User API] Update User Success',
  props<{ user: User }>()
);

export const updateUserFailure = createAction(
  '[User API] Update User Failure',
  props<{ error: string }>()
);

export const deleteUser = createAction(
  '[User Component] Delete User',
  props<{ userId: number }>()
);

export const deleteUserSuccess = createAction(
  '[User API] Delete User Success',
  props<{ userId: number }>()
);

export const deleteUserFailure = createAction(
  '[User API] Delete User Failure',
  props<{ error: string }>()
);

export const selectUser = createAction(
  '[User Component] Select User',
  props<{ userId: number | null }>()
);

export const loadUserDetails = createAction(
  '[User Effect] Load User Details',
  props<{ userId: number }>()
);

export const loadUserDetailsSuccess = createAction(
  '[User API] Load User Details Success',
  props<{ userDetails: User }>()
);

export const loadUserDetailsFailure = createAction(
  '[User API] Load User Details Failure',
  props<{ error: string }>()
);
