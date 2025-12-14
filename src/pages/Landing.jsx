/**
 * Landing Page Component
 * The welcome page with hero section, company info, and Get Started button
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, ArrowRight, Heart, Truck, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
const Landing = () => {
    return <main className="min-h-screen page-transition">
      
      {/* Hero Section with Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&h=1080&fit=crop')`
        }}>
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/80"/>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          
          {/* Animated Leaf Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/20 backdrop-blur-sm mb-8 animate-bounce">
            <Leaf className="w-10 h-10 text-accent"/>
          </div>

          {/* Company Name */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-primary-foreground mb-6 animate-slide-up">
            Paradise Nursery
          </h1>

          {/* Company Tagline */}
          <p className="text-xl sm:text-2xl text-primary-foreground/90 mb-4 max-w-2xl mx-auto animate-slide-up" style={{
            animationDelay: '0.1s'
        }}>
            Bringing Nature Home
          </p>

          {/* Company Description */}
          <p className="text-lg text-primary-foreground/80 mb-10 max-w-xl mx-auto animate-slide-up" style={{
            animationDelay: '0.2s'
        }}>
            Welcome to Paradise Nursery, where green meets serenity! 
            We are your one-stop destination for all things green and growing. 
            Our mission is to help you discover the perfect plant to transform your space into a natural haven.
          </p>

          {/* Get Started Button with glow effect */}
          <div className="animate-slide-up" style={{
            animationDelay: '0.3s'
        }}>
            <Button asChild size="lg" className="btn-hover-glow bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg px-8 py-6 rounded-full shadow-lg">
              <Link to="/products">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"/>
              </Link>
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          
          {/* Section Title */}
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center text-foreground mb-4">
            Why Choose Paradise Nursery?
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            We're passionate about plants and committed to helping you find the perfect green companions for your home.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            
            {/* Feature 1: Hand-Selected Plants */}
            <article className="text-center p-6 rounded-2xl bg-secondary/50 hover:bg-secondary transition-all duration-300 hover:-translate-y-2 hover:shadow-card group">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <Heart className="w-7 h-7"/>
              </div>
              <h3 className="font-display text-xl font-semibold mb-2 transition-colors duration-300 group-hover:text-primary">Hand-Selected Plants</h3>
              <p className="text-muted-foreground">
                Every plant is carefully chosen for health and beauty before it reaches your home.
              </p>
            </article>

            {/* Feature 2: Fast Delivery */}
            <article className="text-center p-6 rounded-2xl bg-secondary/50 hover:bg-secondary transition-all duration-300 hover:-translate-y-2 hover:shadow-card group">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <Truck className="w-7 h-7"/>
              </div>
              <h3 className="font-display text-xl font-semibold mb-2 transition-colors duration-300 group-hover:text-primary">Fast Delivery</h3>
              <p className="text-muted-foreground">
                Get your plants delivered quickly and safely right to your doorstep.
              </p>
            </article>

            {/* Feature 3: Expert Care Tips */}
            <article className="text-center p-6 rounded-2xl bg-secondary/50 hover:bg-secondary transition-all duration-300 hover:-translate-y-2 hover:shadow-card group">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <ThumbsUp className="w-7 h-7"/>
              </div>
              <h3 className="font-display text-xl font-semibold mb-2 transition-colors duration-300 group-hover:text-primary">Expert Care Tips</h3>
              <p className="text-muted-foreground">
                Receive care instructions with every purchase to keep your plants thriving.
              </p>
            </article>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <Button asChild size="lg" className="btn-hover-lift font-semibold">
              <Link to="/products">
                Browse Our Collection
                <ArrowRight className="ml-2 h-4 w-4 transition-transform hover:translate-x-1"/>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Leaf className="h-5 w-5"/>
            <span className="font-display font-semibold">Paradise Nursery</span>
          </div>
          <p className="text-primary-foreground/70 text-sm">
            © 2024 Paradise Nursery. All rights reserved.
          </p>
        </div>
      </footer>
    </main>;
};
export default Landing;
