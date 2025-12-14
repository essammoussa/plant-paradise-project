/**
 * Cart Page Component
 * Displays shopping cart with items, quantities, totals, and checkout
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, CreditCard, Leaf } from 'lucide-react';
import Header from '@/components/Header';
import CartItem from '@/components/CartItem';
import CheckoutDialog from '@/components/CheckoutDialog';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const Cart = () => {
  // Get cart data and functions from context
  const { cartItems, getTotalItems, getTotalPrice, clearCart } = useCart();
  
  // Checkout dialog state
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  
  // Calculate totals
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  /**
   * Handle checkout confirmation with customer details
   */
  const handleCheckoutConfirm = (data) => {
    console.log('Order placed:', { ...data, items: cartItems, total: totalPrice });
    setCheckoutOpen(false);
    toast({
      title: "Thank you, " + data.name + "!",
      description: "Your order has been placed and will be delivered to " + data.address,
    });
    clearCart();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Navigation and Cart Icon */}
      <Header />

      {/* Main Content with page transition */}
      <main className="container mx-auto px-4 py-8 page-transition">
        
        {/* Page Title */}
        <div className="flex items-center gap-4 mb-8 animate-slide-up">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Shopping Cart
            </h1>
            <p className="text-muted-foreground">
              {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
        </div>

        {/* Cart Content */}
        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="text-center py-16 animate-fade-in">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-secondary mb-6">
              <Leaf className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
              Your cart is empty
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Looks like you haven't added any plants to your cart yet. 
              Start browsing our collection to find your perfect green companion!
            </p>
            <Button asChild size="lg" className="btn-hover-lift">
              <Link to="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Start Shopping
              </Link>
            </Button>
          </div>
        ) : (
          /* Cart with Items */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <div 
                  key={item.plant.id}
                  className="stagger-item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CartItem item={item} />
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div 
                className="bg-card rounded-xl shadow-card p-6 sticky top-24 animate-slide-up"
                style={{ animationDelay: '0.2s' }}
              >
                <h2 className="font-display text-xl font-semibold mb-6 pb-4 border-b border-border">
                  Order Summary
                </h2>

                {/* Summary Details */}
                <div className="space-y-3 mb-6">
                  {/* Total Items */}
                  <div className="flex justify-between text-muted-foreground">
                    <span>Total Items</span>
                    <span className="font-medium text-foreground">{totalItems}</span>
                  </div>
                  
                  {/* Subtotal */}
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="font-medium text-foreground">${totalPrice}</span>
                  </div>
                  
                  {/* Shipping */}
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="font-medium text-primary">Free</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center py-4 border-t border-border mb-6">
                  <span className="font-display text-lg font-semibold">Total</span>
                  <span className="font-display text-2xl font-bold text-primary">
                    ${totalPrice}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {/* Checkout Button */}
                  <Button 
                    className="w-full gap-2 btn-hover-glow bg-accent hover:bg-accent/90 text-accent-foreground"
                    size="lg"
                    onClick={() => setCheckoutOpen(true)}
                  >
                    <CreditCard className="h-4 w-4" />
                    Checkout
                  </Button>
                  
                  {/* Checkout Dialog */}
                  <CheckoutDialog
                    open={checkoutOpen}
                    onOpenChange={setCheckoutOpen}
                    onConfirm={handleCheckoutConfirm}
                    totalPrice={totalPrice}
                  />
                  <Button 
                    asChild
                    variant="outline"
                    className="w-full gap-2 btn-hover-lift"
                    size="lg"
                  >
                    <Link to="/products">
                      <ArrowLeft className="h-4 w-4" />
                      Continue Shopping
                    </Link>
                  </Button>
                </div>

                {/* Security Note */}
                <p className="text-center text-xs text-muted-foreground mt-6">
                  Secure checkout powered by Paradise Nursery
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
