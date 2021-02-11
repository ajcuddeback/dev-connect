const { Product } = require("../models/Store_Models");

const productData = [
  {
    product_name: "Plain T-Shirt",
    price: 14.99,
    stock: 14,
    category_id: 1,
  },
  {
    product_name: "Running Sneakers",
    price: 90.0,
    stock: 25,
    category_id: 4,
  },
  {
    product_name: "Branded Baseball Hat",
    price: 22.99,
    stock: 12,
    category_id: 3,
  },

  {
    product_name: "Sweatshirt",
    price: 29.99,
    stock: 22,
    category_id: 1,
  },
  {
    product_name: "Coffee Mug",
    price: 10.99,
    stock: 22,
    category_id: 2,
  },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;
