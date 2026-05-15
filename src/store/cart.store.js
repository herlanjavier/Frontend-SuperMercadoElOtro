import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';
import {
  calculateCartItemsCount,
  calculateCartTotal,
  canAddProduct,
  normalizeCartProduct,
} from '../utils/cartHelpers.js';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      lastOrder: null,

      addItem(product, amount = 1) {
        const items = get().items;
        const current = items.find((item) => item.productId === product.id);
        const currentQuantity = current?.quantity || 0;
        const validation = canAddProduct(product, currentQuantity);

        if (!validation.ok) {
          toast.error(validation.message);
          return false;
        }

        if (currentQuantity + amount > Number(product.stock || 0)) {
          toast.error('No puedes agregar más unidades de las disponibles.');
          return false;
        }

        if (current) {
          set({
            items: items.map((item) =>
              item.productId === product.id ? { ...item, quantity: item.quantity + amount, stock: product.stock } : item,
            ),
          });
          toast.success('Cantidad actualizada');
          return true;
        }

        set({ items: [...items, { ...normalizeCartProduct(product), quantity: amount }] });
        toast.success('Producto agregado al carrito');
        return true;
      },

      removeItem(productId) {
        set({ items: get().items.filter((item) => item.productId !== productId) });
      },

      increaseQuantity(productId) {
        const item = get().items.find((cartItem) => cartItem.productId === productId);
        if (!item) return;
        if (item.quantity >= item.stock) {
          toast.error('No puedes agregar más unidades de las disponibles.');
          return;
        }
        get().updateQuantity(productId, item.quantity + 1);
      },

      decreaseQuantity(productId) {
        const item = get().items.find((cartItem) => cartItem.productId === productId);
        if (!item) return;
        get().updateQuantity(productId, item.quantity - 1);
      },

      updateQuantity(productId, quantity) {
        const nextQuantity = Number(quantity);
        const item = get().items.find((cartItem) => cartItem.productId === productId);
        if (!item) return;
        if (nextQuantity <= 0) {
          get().removeItem(productId);
          return;
        }
        if (nextQuantity > item.stock) {
          toast.error('No puedes agregar más unidades de las disponibles.');
          return;
        }
        set({
          items: get().items.map((cartItem) =>
            cartItem.productId === productId ? { ...cartItem, quantity: nextQuantity } : cartItem,
          ),
        });
      },

      clearCart() {
        set({ items: [] });
      },
      openCart() {
        set({ isCartOpen: true });
      },
      closeCart() {
        set({ isCartOpen: false });
      },
      toggleCart() {
        set((state) => ({ isCartOpen: !state.isCartOpen }));
      },
      setLastOrder(order) {
        set({ lastOrder: order });
      },
      getTotalItems() {
        return calculateCartItemsCount(get().items);
      },
      getTotalAmount() {
        return calculateCartTotal(get().items);
      },
    }),
    {
      name: 'el_otro_cart',
      partialize: (state) => ({ items: state.items, lastOrder: state.lastOrder }),
    },
  ),
);
