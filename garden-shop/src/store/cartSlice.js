import { createSlice } from '@reduxjs/toolkit';
import { getPrice } from '../utils/products';

const CART_STORAGE_KEY = 'garden-shop-cart';

const loadCart = () => {
  try {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
};

const saveCart = (items) => localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCart(),
  },
  reducers: {
    addToCart(state, action) {
      const { product, quantity = 1 } = action.payload;
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ ...product, quantity });
      }
      saveCart(state.items);
    },
    incrementQuantity(state, action) {
      const item = state.items.find(({ id }) => id === action.payload);
      if (item) item.quantity += 1;
      saveCart(state.items);
    },
    decrementQuantity(state, action) {
      const item = state.items.find(({ id }) => id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      saveCart(state.items);
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(({ id }) => id !== action.payload);
      saveCart(state.items);
    },
    clearCart(state) {
      state.items = [];
      saveCart(state.items);
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart, clearCart } =
  cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, item) => sum + getPrice(item) * item.quantity, 0);

export default cartSlice.reducer;
