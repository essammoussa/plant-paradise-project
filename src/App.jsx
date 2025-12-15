/**
 * Main App Component
 * Sets up routing and global providers for the application
 */
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Import the CartProvider for global cart state
import { CartProvider } from "@/context/CartContext";
// Import page components
import Landing from "./pages/Landing";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import { HashRouter } from "react-router-dom";

// Create a QueryClient instance for React Query
const queryClient = new QueryClient();
const App = () => (
// QueryClientProvider for data fetching (if needed in future)
<QueryClientProvider client={queryClient}>
    {/* CartProvider wraps entire app to share cart state */}
    <CartProvider>
      <TooltipProvider>
        {/* Toast notifications */}
        <Toaster />
        <Sonner />
        
        {/* Router setup */}
        <HashRouter>
          <Routes>
            {/* Landing Page - Home route */}
            <Route path="/" element={<Landing />}/>
            
            {/* Products Page - Browse plants */}
            <Route path="/products" element={<Products />}/>
            
            {/* Shopping Cart Page */}
            <Route path="/cart" element={<Cart />}/>
            
            {/* 404 Page - Catch all unmatched routes */}
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </HashRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>);
export default App;
