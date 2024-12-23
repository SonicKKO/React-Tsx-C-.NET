import React, { createContext, useState, useContext } from "react";
interface CartItem {
  id: string;        // Уникальный идентификатор товара
  price: number;     // Цена товара
  quantity: number;  // Количество
}

interface CartContextProps {
  cartItems: CartItem[]; 
  addToCart: (id: string, price: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  calculateTotalPrice: () => number;
  decreaseQuantity: (id: string) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);


export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (id: string, price: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { id, price, quantity: 1 }];
    });
  };
  
  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };  

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const decreaseQuantity = (id: string) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0) // Удаляем товар, если его количество стало 0
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, calculateTotalPrice,  decreaseQuantity, }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("popochka");
  }
  return context;
};

