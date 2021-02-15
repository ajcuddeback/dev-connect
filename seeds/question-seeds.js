const { Question } = require("../models/Question_Models");

const questionData = [
  {
    question_text: 'How do I center my text with CSS?',
    user_id: '1'
  },
  {
    product_name: 'How do I link my javascript file to my web page?',
    user_id: '2'
  },
  {
    question_text: 'Whats the git command for adding heroku?',
    user_id: '3'
  }
];

const seedQuestions = () => Question.bulkCreate(questionData);

module.exports = seedQuestions;
