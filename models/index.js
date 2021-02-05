const User = require('./User');
const Group = require('./Group');
const Event = require('./Event');
const Group_Users = require('./Group_User');
const Event_Users = require('./Event_User');

User.hasMany(Group, {
    foreignKey: 'user_id'
});

Group.belongsTo(User, {
    foreignKey: 'user_id'
});

User.belongsToMany(Group, {
    through: Group_Users,
    as: 'group_users',
    foreignKey: 'user_id'
});

Group.belongsToMany(User, {
    through: Group_Users,
    as: 'group_users',
    foreignKey: 'group_id'
});

Group_Users.belongsTo(User, {
    foreignKey: 'user_id'
});

Group_Users.belongsTo(Group, {
    foreignKey: 'group_id'
});

User.hasMany(Group_Users, {
    foreignKey: 'user_id'
});

Group.hasMany(Group_Users, {
    foreignKey: 'group_id'
});


module.exports = { User, Group, Event }