const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI).then(async () => {

  await Product.deleteMany();

  const products = [
    {
      title: "iPhone 15",
      price: 75000,
      description: "Latest Apple smartphone",
      image: "https://images.unsplash.com/photo-1695048133149-0b0d6c07f2c7"
    },
    {
      title: "Nike Shoes",
      price: 5000,
      description: "Comfortable running shoes",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    },
    {
      title: "Gaming Laptop",
      price: 90000,
      description: "High performance laptop",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
    },
    {
      title: "Headphones",
      price: 3000,
      description: "Noise cancelling headphones",
      image: "https://images.unsplash.com/photo-1518441902110-0b7c0c4b5f3a"
    },
    {
      title: "Smart Watch",
      price: 7000,
      description: "Fitness smart watch",
      image: "https://images.unsplash.com/photo-1516570161787-2fd917215a3d"
    }
  ];
  

  const adjectives = ["Ultra", "Pro", "Smart", "Eco", "Premium", "Classic", "Max", "Mini", "Lite", "Air"];
  const categories = ["Backpack", "Bluetooth Speaker", "Desk Lamp", "Coffee Maker", "Office Chair", "Sunglasses", "Keyboard", "Monitor", "Camera", "Perfume", "Jacket", "Fitness Band"];

  for (let i = 1; i <= 50; i++) {
    const adj = adjectives[i % adjectives.length];
    const cat = categories[i % categories.length];
    products.push({
      title: `${adj} ${cat} ${i}`,
      price: 499 + i * 137,
      description: `A great ${cat.toLowerCase()} built for everyday use. (Item ${i})`,
      image: `https://picsum.photos/seed/product${i}/900/700`
    });
  }

  await Product.insertMany(products);

  console.log("Seed data inserted");
  process.exit();
});
