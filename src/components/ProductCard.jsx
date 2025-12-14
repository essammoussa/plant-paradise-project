/**
 * ProductCard Component
 * Displays a single plant product with image, name, price, and add to cart button
 */
import React, { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
const ProductCard = ({ plant, index = 0 }) => {
    // Get addToCart function from context
    const { addToCart, cartItems } = useCart();
    // State for showing "Added!" feedback
    const [justAdded, setJustAdded] = useState(false);
    // Check if plant is already in cart
    const isInCart = cartItems.some(item => item.plant.id === plant.id);
    /**
     * Handle adding plant to cart
     * Shows brief "Added!" feedback
     */
    const handleAddToCart = () => {
        addToCart(plant);
        setJustAdded(true);
        // Reset feedback after 1.5 seconds
        setTimeout(() => {
            setJustAdded(false);
        }, 1500);
    };
    return (<article className="stagger-item group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-500 transform hover:-translate-y-2" style={{ animationDelay: `${index * 0.1}s` }}>
      
      {/* Plant Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img src={plant.image} alt={plant.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" loading="lazy"/>
        
        {/* Category Tag */}
        <span className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-xs font-medium px-3 py-1 rounded-full transform transition-transform duration-300 group-hover:scale-105">
          {plant.category}
        </span>
      </div>

      {/* Plant Details */}
      <div className="p-4">
        {/* Plant Name */}
        <h3 className="font-display text-lg font-semibold text-foreground mb-1">
          {plant.name}
        </h3>
        
        {/* Plant Description */}
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {plant.description}
        </p>
        
        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          {/* Price */}
          <span className="text-xl font-bold text-primary">
            ${plant.price}
          </span>
          
          {/* Add to Cart Button with hover effects */}
          <Button onClick={handleAddToCart} variant={justAdded ? "secondary" : "default"} size="sm" className={`gap-2 btn-hover-lift ${justAdded
            ? 'bg-secondary text-secondary-foreground'
            : 'bg-primary hover:bg-primary/90'}`}>
            {justAdded ? (<>
                <Check className="h-4 w-4 animate-scale-in"/>
                Added!
              </>) : (<>
                <ShoppingCart className="h-4 w-4 transition-transform group-hover:rotate-12"/>
                {isInCart ? 'Add More' : 'Add to Cart'}
              </>)}
          </Button>
        </div>
      </div>
    </article>);
};
export default ProductCard;
