/**
 * Header Component
 * Displays navigation links and shopping cart icon with item count
 * Used on Product and Cart pages (not on Landing page)
 */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Leaf, Home, TreePine } from 'lucide-react';
import { useCart } from '@/context/CartContext';
const Header = () => {
    // Get cart info from context
    const { getTotalItems } = useCart();
    // Get current page location for active link styling
    const location = useLocation();
    // Calculate total items in cart
    const totalItems = getTotalItems();
    return (<header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          
          {/* Logo and Brand Name */}
          <Link to="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-all duration-300 hover:scale-105">
            <Leaf className="h-8 w-8 transition-transform duration-300 hover:rotate-12"/>
            <span className="font-display text-xl font-semibold">
              Paradise Nursery
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            
            {/* Home Link */}
            <Link to="/" className={`nav-link flex items-center gap-1 font-medium ${location.pathname === '/'
            ? 'text-primary active'
            : 'text-muted-foreground hover:text-primary'}`}>
              <Home className="h-4 w-4"/>
              <span className="hidden sm:inline">Home</span>
            </Link>

            {/* Products Link */}
            <Link to="/products" className={`nav-link flex items-center gap-1 font-medium ${location.pathname === '/products'
            ? 'text-primary active'
            : 'text-muted-foreground hover:text-primary'}`}>
              <TreePine className="h-4 w-4"/>
              <span>Plants</span>
            </Link>

            {/* Shopping Cart Link with Badge */}
            <Link to="/cart" className={`cart-icon-bounce relative flex items-center gap-1 font-medium transition-colors ${location.pathname === '/cart'
            ? 'text-primary'
            : 'text-muted-foreground hover:text-primary'}`}>
              <ShoppingCart className="h-5 w-5"/>
              
              {/* Cart Item Count Badge */}
              {totalItems > 0 && (<span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-scale-in">
                  {totalItems}
                </span>)}
            </Link>
          </div>
        </nav>
      </div>
    </header>);
};
export default Header;
