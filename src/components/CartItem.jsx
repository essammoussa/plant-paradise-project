/**
 * CartItem Component
 * Displays a single item in the shopping cart with quantity controls
 */
import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
const CartItem = ({ item }) => {
    // Get cart functions from context
    const { updateQuantity, removeFromCart } = useCart();
    // Destructure plant and quantity from item
    const { plant, quantity } = item;
    // Calculate total price for this item
    const itemTotal = plant.price * quantity;
    /**
     * Increase quantity by 1
     */
    const handleIncrease = () => {
        updateQuantity(plant.id, quantity + 1);
    };
    /**
     * Decrease quantity by 1
     */
    const handleDecrease = () => {
        updateQuantity(plant.id, quantity - 1);
    };
    /**
     * Remove item from cart
     */
    const handleRemove = () => {
        removeFromCart(plant.id);
    };
    return (<article className="flex items-center gap-4 p-4 bg-card rounded-xl shadow-soft animate-fade-in-up">
      
      {/* Plant Thumbnail Image */}
      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-secondary">
        <img src={plant.image} alt={plant.name} className="w-full h-full object-cover"/>
      </div>

      {/* Item Details */}
      <div className="flex-1 min-w-0">
        {/* Plant Name */}
        <h3 className="font-display text-lg font-semibold text-foreground truncate">
          {plant.name}
        </h3>
        
        {/* Unit Price */}
        <p className="text-muted-foreground text-sm">
          ${plant.price} each
        </p>
        
        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-2">
          {/* Decrease Button */}
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleDecrease} aria-label="Decrease quantity">
            <Minus className="h-4 w-4"/>
          </Button>
          
          {/* Current Quantity */}
          <span className="w-8 text-center font-semibold">
            {quantity}
          </span>
          
          {/* Increase Button */}
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleIncrease} aria-label="Increase quantity">
            <Plus className="h-4 w-4"/>
          </Button>
        </div>
      </div>

      {/* Item Total and Delete */}
      <div className="flex flex-col items-end gap-2">
        {/* Item Total Price */}
        <span className="text-lg font-bold text-primary">
          ${itemTotal}
        </span>
        
        {/* Delete Button */}
        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={handleRemove} aria-label={`Remove ${plant.name} from cart`}>
          <Trash2 className="h-4 w-4 mr-1"/>
          Remove
        </Button>
      </div>
    </article>);
};
export default CartItem;
