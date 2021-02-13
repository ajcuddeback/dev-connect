const User = require("./User");
const Group = require("./Event_Models/Group");
const Event = require("./Event_Models/Event");
const Group_Users = require("./Event_Models/Group_User");
const Event_Users = require("./Event_Models/Event_User");
const Post = require("./Social_Models/Post");
const Comment = require("./Social_Models/Comment");
const Product = require("./Store_Models/Product");
const Category = require("./Store_Models/Category");
const Tag = require("./Store_Models/Tag");
const ProductTag = require("./Store_Models/ProductTag");
const Items = require("./Store_Models/Items");

// User to Group Associations
User.hasMany(Group, {
  foreignKey: "user_id",
});

Group.belongsTo(User, {
  foreignKey: "user_id",
});

User.belongsToMany(Group, {
  through: Group_Users,
  as: "group_user",
  foreignKey: "user_id",
});

Group.belongsToMany(User, {
  through: Group_Users,
  as: "group_user",
  foreignKey: "group_id",
});

Group_Users.belongsTo(User, {
  foreignKey: "user_id",
});

Group_Users.belongsTo(Group, {
  foreignKey: "group_id",
});

User.hasMany(Group_Users, {
  foreignKey: "user_id",
});

Group.hasMany(Group_Users, {
  foreignKey: "group_id",
});

// User to Event associations
User.hasMany(Event, {
  foreignKey: "user_id",
});

Event.belongsTo(User, {
  foreignKey: "user_id",
});

User.belongsToMany(Event, {
  through: Event_Users,
  as: "event_user",
  foreignKey: "user_id",
});

Event.belongsToMany(User, {
  through: Event_Users,
  as: "event_user",
  foreignKey: "event_id",
});

Event_Users.belongsTo(User, {
  foreignKey: "user_id",
});

Event_Users.belongsTo(Event, {
  foreignKey: "event_id",
});

User.hasMany(Event_Users, {
  foreignKey: "user_id",
});

Event.hasMany(Event_Users, {
  foreignKey: "event_id",
});

Event.belongsTo(Group, {
  foreignKey: "group_id",
});

Group.hasMany(Event, {
  foreignKey: "group_id",
});

//create associations
User.hasMany(Post);

Post.belongsTo(User);

Comment.belongsTo(User);

Comment.belongsTo(Post);

User.hasMany(Comment);

Post.hasMany(Comment);

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: "category_id",
});
// Categories have many Products
Category.hasMany(Product, {
  foreignKey: "category_id",
});
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  as: "product_tags",
  foreignKey: "product_id",
});
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  as: "product_tags",
  foreignKey: "tag_id",
});
User.hasMany(Items, {
  foreignKey: "user_id",
});

Product.hasMany(Items, {
  foreignKey: "product_id",
});

Items.belongsTo(Product, {
  foreignKey: "product_id",
});

Items.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = {
  User,
  Post,
  Comment,
  Group,
  Event,
  Group_Users,
  Event_Users,
  Product,
  Category,
  Tag,
  ProductTag,
  Items,
};
