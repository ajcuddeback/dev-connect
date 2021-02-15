const { Answer } = require("../models/Question_Models");

const answerData = [
  {
    answer_text: 'Have you tried using text-align: center?',
    user_id: 2,
    question_id: 1
  },
  {
    answer_text: 'You could also try bootstrap for easy to use styling.',
    user_id: 3,
    question_id: 1
  },
  {
    answer_text: 'You need to add a script tag with pathing to your js file at the bottom of your html doc',
    user_id: 1,
    question_id: 2
  },
  {
    answer_text: 'heroku create',
    user_id: 2,
    question_id: 3
  }
];

const seedAnswers = () => Answer.bulkCreate(answerData);

module.exports = seedAnswers;