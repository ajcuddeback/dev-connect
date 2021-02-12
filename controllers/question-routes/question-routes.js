const router = require('express').Router();
const { User, Question, QuestionTag, Tag, Answer } = require('../../models');

// get all questions
router.get('/', (req, res) => {
    Question.findAll({
        order: [['created_at', 'DESC']],
        // Query configuration
        attributes: [
            'id', 
            'question_text', 
            'created_at'
        ],
        include: [
            {
                model: Answer,
                attributes: ['id', 'answer_text', 'question_id', 'user_id', 'created_at'],
                include: {
                  model: User,
                  attributes: ['username']
                },
            },
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Tag,
                attributes: ['id', 'tag_name'],
                through: QuestionTag,
                as: 'question_tags'
            }
        ]
    }).then(dbQuestionData => res.json(dbQuestionData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// route retrieve a single post
router.get('/:id', (req, res) => {
    Question.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id', 
            'question_text',  
            'created_at'
        ],
        include: [
            {
                model: Answer,
                attributes: ['id', 'answer_text', 'question_id', 'user_id', 'created_at'],
                include: {
                  model: User,
                  attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    }).then(dbQuestionData => {
        if (!dbQuestionData) {
            res.status(404).json({ message: 'Unable to locate a Question with this id'});
            return;
        }
        res.json(dbQuestionData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// creating a question
router.post('/', (req, res) => {
    Question.create({
        question_text: req.body.question_text,
        user_id: req.session.user_id
    })
    .then(dbQuestionData => res.json(dbQuestionData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});