import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Order } from '../../models/order.model';

export interface OrderState extends EntityState<Order> {
  loading: boolean;
  error: string | null;
}

export const orderAdapter: EntityAdapter<Order> = createEntityAdapter<Order>({
  selectId: (order: Order) => order.id,
  sortComparer: false
});

export const initialOrderState: OrderState = orderAdapter.getInitialState({
  loading: false,
  error: null
});
