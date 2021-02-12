const { Product } = require("../models/Store_Models");

const products = [
  {
    product_name: "Plain T-Shirt",
    imgPath: "/images/Black_TShirt.jpg",
    price: 14.99,
    stock: 14,
    category_id: 1,
  },
  {
    product_name: "Running Sneakers",
    imgPath: "/images/Black_TShirt.jpg",
    price: 90.0,
    stock: 25,
    category_id: 4,
  },
  {
    product_name: "Branded Baseball Hat",
    imgPath: "/images/Black_TShirt.jpg",
    price: 22.99,
    stock: 12,
    category_id: 3,
  },

  {
    product_name: "Sweatshirt",
    imgPath: "/images/Black_TShirt.jpg",
    price: 29.99,
    stock: 22,
    category_id: 1,
  },
  {
    product_name: "Coffee Mug",
    imgPath: "/images/Black_TShirt.jpg",
    price: 10.99,
    stock: 22,
    category_id: 2,
  },
];

const seedProducts = () => Product.bulkCreate(products);

module.exports = seedProducts;
