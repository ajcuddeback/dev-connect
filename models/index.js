const User = require('./User');
const Group = require('./Event_Models/Group');
const Event = require('./Event_Models/Event');
const Group_Users = require('./Event_Models/Group_User');
const Event_Users = require('./Event_Models/Event_User');
const Question = require('./Question_Models/Question');
const Answer = require('./Question_Models/Answer')

// User to Group Associations
User.hasMany(Group, {
    foreignKey: 'user_id'
});

Group.belongsTo(User, {
    foreignKey: 'user_id'
});

User.belongsToMany(Group, {
    through: Group_Users,
    as: 'group_user',
    foreignKey: 'user_id'
});

Group.belongsToMany(User, {
    through: Group_Users,
    as: 'group_user',
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


// User to Event associations
User.hasMany(Event, {
    foreignKey: 'user_id'
});

Event.belongsTo(User, {
    foreignKey: 'user_id'
});

User.belongsToMany(Event, {
    through: Event_Users,
    as: 'event_user',
    foreignKey: 'user_id'
});

Event.belongsToMany(User, {
    through: Event_Users,
    as: 'event_user',
    foreignKey: 'event_id'
});

Event_Users.belongsTo(User, {
    foreignKey: 'user_id'
});

Event_Users.belongsTo(Event, {
    foreignKey: 'event_id'
});

User.hasMany(Event_Users, {
    foreignKey: 'user_id'
});

Event.hasMany(Event_Users, {
    foreignKey: 'event_id'
});

Event.belongsTo(Group, {
    foreignKey: 'group_id'
});

Group.hasMany(Event, {
    foreignKey: 'group_id'
});

// Question and Answer Associations
User.hasMany(Question, {
    foreignKey: 'user_id'
});

Question.belongsTo(User, {
    foreignKey: 'user_id'
});

Question.hasMany(Answer, {
    foreignKey: 'answer_id'
});

Answer.belongsTo(Question, {
    foreignKey: 'question_id'
});

Question.belongsToMany(Tag, {
    through: QuestionTag,
    as: 'question_tags',
    foreignKey: 'question_id'
});

Tag.belongsToMany(Question, {
    through: QuestionTag,
    as: 'question_tags',
    foreignKey: 'tag_id'
});


module.exports = { User, Group, Event, Group_Users, Event_Users, Question, Answer }