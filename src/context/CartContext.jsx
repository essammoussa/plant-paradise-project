/**
 * Cart Context
 * This provides global state management for the shopping cart
 * Using React Context API to share cart data across all components
 */
import React, { createContext, useContext, useState } from 'react';
// Create the context with undefined as default
const CartContext = createContext(undefined);
// Provider component that wraps the app and provides cart functionality
export const CartProvider = ({ children }) => {
    // State to store cart items
    const [cartItems, setCartItems] = useState([]);
    /**
     * Add a plant to the cart
     * If plant already exists, increase quantity by 1
     * Otherwise, add new item with quantity 1
     */
    const addToCart = (plant) => {
        setCartItems(prevItems => {
            // Check if plant is already in cart
            const existingItem = prevItems.find(item => item.plant.id === plant.id);
            if (existingItem) {
                // Plant exists - increase quantity
                return prevItems.map(item => item.plant.id === plant.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item);
            }
            else {
                // New plant - add to cart with quantity 1
                return [...prevItems, { plant, quantity: 1 }];
            }
        });
    };
    /**
     * Remove a plant completely from the cart
     */
    const removeFromCart = (plantId) => {
        setCartItems(prevItems => prevItems.filter(item => item.plant.id !== plantId));
    };
    /**
     * Update the quantity of a specific plant
     * If quantity is 0 or less, remove the item
     */
    const updateQuantity = (plantId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(plantId);
        }
        else {
            setCartItems(prevItems => prevItems.map(item => item.plant.id === plantId
                ? { ...item, quantity }
                : item));
        }
    };
    /**
     * Calculate total number of items in cart
     */
    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };
    /**
     * Calculate total price of all items in cart
     */
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.plant.price * item.quantity), 0);
    };
    /**
     * Clear all items from cart
     */
    const clearCart = () => {
        setCartItems([]);
    };
    // Provide all cart functions and data to children components
    return (<CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            getTotalItems,
            getTotalPrice,
            clearCart
        }}>
      {children}
    </CartContext.Provider>);
};
/**
 * Custom hook to use the cart context
 * This makes it easy to access cart data from any component
 */
export const useCart = () => {
    const context = useContext(CartContext);
    // Throw error if used outside of CartProvider
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
