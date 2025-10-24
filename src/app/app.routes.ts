import { Routes } from '@angular/router';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'user-orders',
    pathMatch: 'full'
  },
  {
    path: 'user-orders',
    component: UserOrdersComponent
  },
  {
    path: '**',
    redirectTo: 'user-orders'
  }
];
