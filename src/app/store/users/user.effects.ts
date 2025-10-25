import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, filter } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      switchMap(() =>
        this.userService.getUsers().pipe(
          map(users => UserActions.loadUsersSuccess({ users })),
          catchError(error => of(UserActions.loadUsersFailure({ error: error.message })))
        )
      )
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.addUser),
      switchMap(({ user }) =>
        this.userService.addUser(user).pipe(
          map(addedUser => UserActions.addUserSuccess({ user: addedUser })),
          catchError(error => of(UserActions.addUserFailure({ error: error.message })))
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      switchMap(({ user }) =>
        this.userService.updateUser(user).pipe(
          map(updatedUser => UserActions.updateUserSuccess({ user: updatedUser })),
          catchError(error => of(UserActions.updateUserFailure({ error: error.message })))
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      switchMap(({ userId }) =>
        this.userService.deleteUser(userId).pipe(
          map(() => UserActions.deleteUserSuccess({ userId })),
          catchError(error => of(UserActions.deleteUserFailure({ error: error.message })))
        )
      )
    )
  );

  loadUserDetailsOnSelect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.selectUser),
      filter(({ userId }) => userId !== null),
      switchMap(({ userId }) =>
        this.userService.getUserDetails(userId!).pipe(
          map(userDetails => {
            if (userDetails) {
              return UserActions.loadUserDetailsSuccess({ userDetails });
            } else {
              return UserActions.loadUserDetailsFailure({ error: 'User details not found' });
            }
          }),
          catchError(error => of(UserActions.loadUserDetailsFailure({ error: error.message })))
        )
      )
    )
  );
}
