/**
 * Products Page Component
 * Displays all plants organized by category with Add to Cart functionality
 */
import React from 'react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { plants, categories } from '@/data/plants';
import { Leaf } from 'lucide-react';
const Products = () => {
    // Track global index for stagger animation
    let globalIndex = 0;
    return (<div className="min-h-screen bg-background">
      {/* Header with Navigation and Cart Icon */}
      <Header />

      {/* Main Content with page transition */}
      <main className="container mx-auto px-4 py-8 page-transition">
    
        {/* Page Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4 animate-scale-in">
            <Leaf className="w-8 h-8"/>
          </div>
          <h1 className="font-display text-4xl font-bold text-foreground mb-2 animate-slide-up">
            Our Plant Collection
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Discover our hand-picked selection of beautiful houseplants, 
            perfect for adding life and color to any space.
          </p>
        </div>

        {/* Plants by Category */}
        {categories.map((category, categoryIndex) => (<section key={category} className="mb-12">
            
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-6 animate-slide-up" style={{ animationDelay: `${categoryIndex * 0.15}s` }}>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                {category}
              </h2>
              <div className="flex-1 h-px bg-border"/>
              <span className="text-muted-foreground text-sm">
                {plants.filter(p => p.category === category).length} plants
              </span>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Filter plants by category and render ProductCard for each */}
              {plants
                .filter(plant => plant.category === category)
                .map(plant => {
                const index = globalIndex++;
                return (<ProductCard key={plant.id} plant={plant} index={index}/>);
            })}
            </div>
          </section>))}

        {/* Total Plants Info */}
        <div className="text-center py-8 border-t border-border">
          <p className="text-muted-foreground">
            Showing {plants.length} plants across {categories.length} categories
          </p>
        </div>
      </main>
    </div>);
};
export default Products;
