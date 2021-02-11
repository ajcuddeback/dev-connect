const { Category } = require("../models/Store_Models");

const categoryData = [
  {
    category_name: "Clothing",
  },
  {
    category_name: "Mugs",
  },
  {
    category_name: "Caps",
  },

  {
    category_name: "Shoes",
  },
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
