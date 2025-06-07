export type Product = {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
}

export const mockProducts: Product[] = [
    {
      id: "1",
      name: "Wireless Bluetooth Headphones",
      price: 59.99,
      description: "High-quality wireless headphones with noise cancellation and long battery life.",
      image: "https://images.unsplash.com/photo-1599605571400-84c8410dc889?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Electronics"
    },
    {
      id: "2",
      name: "Smart Fitness Watch",
      price: 129.99,
      description: "Track your fitness goals with this waterproof smart watch with heart-rate monitoring.",
      image: "https://images.unsplash.com/photo-1629339837617-7069ce9e7f6b?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Wearables"
    },
    {
      id: "3",
      name: "Gaming Laptop",
      price: 1199.99,
      description: "High-performance gaming laptop with NVIDIA graphics and 16GB RAM.",
      image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Computers"
    },
    {
      id: "4",
      name: "Coffee Maker",
      price: 89.99,
      description: "Brew the perfect cup with this programmable coffee maker.",
      image: "https://images.unsplash.com/photo-1707241358597-bafcc8a8e73d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Home Appliances"
    },
    {
      id: "5",
      name: "Office Chair",
      price: 199.99,
      description: "Ergonomic office chair with lumbar support and adjustable height.",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Furniture"
    },
    {
        id: "6",
        name: "Wireless Headphones",
        description:
          "Premium noise-cancelling wireless headphones with long battery life.",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        category: "Electronics",
      },
      {
        id: "7",
        name: "Smart Watch",
        description:
          "Fitness tracker with heart rate monitoring and sleep analysis.",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        category: "Electronics",
      },
  ];
  