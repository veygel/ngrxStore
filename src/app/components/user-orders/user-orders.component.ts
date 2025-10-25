import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import {
  map,
  debounceTime,
  distinctUntilChanged,
  takeUntil,
} from 'rxjs/operators';
import {
  selectAllUsers,
  selectUser,
  loadUsers,
  selectSelectedUser,
  addUser,
  updateUser,
  deleteUser,
  selectUserLoading,
} from '../../store/users';
import { loadOrders } from '../../store/orders';
import { User } from '../../models/user.model';
import { UserComponent } from '../user/user.component';
import { OrdersTotalComponent } from '../orders-total/orders-total.component';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [CommonModule, FormsModule, UserComponent, OrdersTotalComponent],
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.scss',
})
export class UserOrdersComponent implements OnInit, OnDestroy {
  public users$: Observable<User[]>;
  public filteredUsers$: Observable<User[]>;
  public selectedUser$: Observable<User | null | undefined>;
  public loading$: Observable<boolean>;

  // Form fields
  public newUserName: string = '';
  public newUserId: number | null = null;
  public updateUserName: string = '';
  public searchTerm: string = '';

  // Delete confirmation
  public userToDelete: number | null = null;

  // Search debounce
  private searchSubject$ = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(private store: Store) {
    this.users$ = this.store.select(selectAllUsers);
    this.filteredUsers$ = this.users$;
    this.selectedUser$ = this.store.select(selectSelectedUser);
    this.loading$ = this.store.select(selectUserLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
    this.store.dispatch(loadOrders());

    // Subscribe to selected user to populate update form
    this.selectedUser$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      if (user) {
        this.updateUserName = user.name;
      }
    });

    // Setup debounced search
    this.searchSubject$
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((searchTerm) => {
        this.performSearch(searchTerm);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSelectUser(userId: number): void {
    this.store.dispatch(selectUser({ userId }));
  }

  public onAddUser(): void {
    if (this.newUserName.trim() && this.newUserId !== null && this.newUserId > 0) {
      const newUser: User = {
        id: this.newUserId,
        name: this.newUserName.trim(),
      };
      this.store.dispatch(addUser({ user: newUser }));

      // Reset form
      this.newUserName = '';
      this.newUserId = null;
    }
  }

  public onUpdateUser(userId: number): void {
    if (this.updateUserName.trim() && userId) {
      const updatedUser: User = {
        id: userId,
        name: this.updateUserName.trim(),
      };
      this.store.dispatch(updateUser({ user: updatedUser }));
    }
  }

  public showDeleteConfirmation(userId: number): void {
    this.userToDelete = userId;
  }

  public cancelDelete(): void {
    this.userToDelete = null;
  }

  public confirmDelete(): void {
    if (this.userToDelete !== null) {
      this.store.dispatch(deleteUser({ userId: this.userToDelete }));
      this.userToDelete = null;
    }
  }

  public onSearch(): void {
    // Emit search term to the subject for debouncing
    this.searchSubject$.next(this.searchTerm);
  }

  private performSearch(searchTerm: string): void {
    const term = searchTerm.toLowerCase().trim();

    if (!term) {
      // If search is empty, show all users
      this.filteredUsers$ = this.users$;
    } else {
      // Filter users by name or ID
      this.filteredUsers$ = this.users$.pipe(
        map((users) =>
          users.filter(
            (user) =>
              user.name.toLowerCase().includes(term) ||
              user.id.toString().includes(term)
          )
        )
      );
    }
  }

  public clearSearch(): void {
    this.searchTerm = '';
    this.searchSubject$.next('');
    this.filteredUsers$ = this.users$;
  }
}
