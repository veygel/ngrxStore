import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from '../../models/user.model';

export interface UserState extends EntityState<User> {
  selectedUserId: number | null;
  userDetails: User | null;
  loading: boolean;
  error: string | null;
}

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user: User) => user.id,
  sortComparer: false
});

export const initialUserState: UserState = userAdapter.getInitialState({
  selectedUserId: null,
  userDetails: null,
  loading: false,
  error: null
});
