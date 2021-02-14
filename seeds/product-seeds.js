const { Product } = require("../models");

const products = [
  {
    product_name: "Branded T-Shirt (white)",
    imgPath: "/images/Black_TShirt.jpg",
    price: 1499,
    stock: 14,
    category_id: 1,
  },
  {
    product_name: "Sweatshirt (white)",
    imgPath: "/images/Black_TShirt.jpg",
    price: 2999,
    stock: 22,
    category_id: 1,
  },
  {
    product_name: "Running Sneakers (white)",
    imgPath: "/images/Black_TShirt.jpg",
    price: 900,
    stock: 25,
    category_id: 3,
  },
  {
    product_name: "Running Sneakers (black)",
    imgPath: "/images/Black_TShirt.jpg",
    price: 900,
    stock: 25,
    category_id: 3,
  },

  {
    product_name: "Coffee Mug (white)",
    imgPath: "/images/Black_TShirt.jpg",
    price: 1099,
    stock: 22,
    category_id: 2,
  },
  {
    product_name: "Water bottle (white)",
    imgPath: "/images/Black_TShirt.jpg",
    price: 1099,
    stock: 22,
    category_id: 2,
  },
];

const seedProducts = () => Product.bulkCreate(products);

module.exports = seedProducts;
