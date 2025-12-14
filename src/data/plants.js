/**
 * Plant data for the Paradise Nursery store
 * Each plant has an id, name, price, image, and category
 */
// Array of all plants available in the store
// Organized into 3 categories: Indoor Plants, Succulents, and Flowering Plants
export const plants = [
    // Indoor Plants Category
    {
        id: 1,
        name: "Monstera Deliciosa",
        price: 45,
        image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&h=400&fit=crop",
        category: "Indoor Plants",
        description: "The iconic Swiss Cheese Plant with beautiful split leaves"
    },
    {
        id: 2,
        name: "Fiddle Leaf Fig",
        price: 65,
        image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=400&fit=crop",
        category: "Indoor Plants",
        description: "Elegant tree with large, violin-shaped leaves"
    },
    {
        id: 3,
        name: "Snake Plant",
        price: 25,
        image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?w=400&h=400&fit=crop",
        category: "Indoor Plants",
        description: "Low-maintenance plant that purifies the air"
    },
    // Succulents Category
    {
        id: 4,
        name: "Echeveria Elegans",
        price: 15,
        image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&h=400&fit=crop",
        category: "Succulents",
        description: "Beautiful rosette-shaped succulent in pale blue-green"
    },
    {
        id: 5,
        name: "Aloe Vera",
        price: 18,
        image: "https://images.unsplash.com/photo-1567331711402-509c12c41959?w=400&h=400&fit=crop",
        category: "Succulents",
        description: "Healing plant with soothing gel inside its leaves"
    },
    {
        id: 6,
        name: "Jade Plant",
        price: 22,
        image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=400&fit=crop",
        category: "Succulents",
        description: "Symbol of good luck with thick, oval leaves"
    },
    // Flowering Plants Category
    {
        id: 7,
        name: "Green Foliage Plant",
        price: 35,
        image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400&h=400&fit=crop",
        category: "Flowering Plants",
        description: "A lush green leafy plant with smooth, oval leaves"
    },
    {
        id: 8,
        name: "Orchid",
        price: 55,
        image: "https://images.unsplash.com/photo-1566873535350-a3f5d4a804b7?w=400&h=400&fit=crop",
        category: "Flowering Plants",
        description: "Exotic and sophisticated flowering plant"
    },
    {
        id: 9,
        name: "Anthurium",
        price: 40,
        image: "https://images.unsplash.com/photo-1610397648930-477b8c7f0943?w=400&h=400&fit=crop",
        category: "Flowering Plants",
        description: "Heart-shaped flowers in vibrant red"
    }
];
// Get unique categories from the plants array
export const categories = [...new Set(plants.map(plant => plant.category))];
