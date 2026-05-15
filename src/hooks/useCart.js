import { useCartStore } from '../store/cart.store.js';
import { calculateCartItemsCount, calculateCartTotal } from '../utils/cartHelpers.js';

export const useCart = () => {
  const store = useCartStore();

  return {
    ...store,
    totalItems: calculateCartItemsCount(store.items),
    totalAmount: calculateCartTotal(store.items),
  };
};
