'use client';
import React, { createContext, useContext, useReducer } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
};

type CartItem = Product & { quantity: number };

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: "ADD_TO_CART"; product: Product }
  | { type: "REMOVE_FROM_CART"; id: string }
  | { type: "CLEAR_CART" };

const CartContext = createContext<{
  state: CartState;
  addToCart: (product: Product) => { success: boolean };
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalQuantity: number;
  totalPrice: number;
}>({
  state: { items: [] },
  addToCart: () => ({ success: false }),
  removeFromCart: () => { },
  clearCart: () => { },
  totalQuantity: 0,
  totalPrice: 0,
});

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.items.find((i) => i.id === action.product.id);
      if (existing) {
        return state;
      }
      return {
        items: [...state.items, { ...action.product, quantity: 1 }],
      };
    }
    case "REMOVE_FROM_CART":
      return {
        items: state.items.filter((i) => i.id !== action.id),
      };
    case "CLEAR_CART":
      return { items: [] };
    default:
      return state;
  }
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addToCart = (product: Product) => {
    const exists = state.items.find((i) => i.id === product.id);
    if (exists) {
      return { success: false };
    }
    dispatch({ type: "ADD_TO_CART", product });
    return { success: true };
  };

  const removeFromCart = (id: string) =>
    dispatch({ type: "REMOVE_FROM_CART", id });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const totalQuantity = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ state, addToCart, removeFromCart, clearCart, totalQuantity, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
