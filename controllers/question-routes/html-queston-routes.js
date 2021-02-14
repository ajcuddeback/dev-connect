const router = require('express').Router();
const { Question, User, Answer, Tag, QuestionTag } = require('../../models');

router.get('/', (req, res) => {
    console.log(req.session);
    Question.findAll({
        attributes: [
            'id',
            'question_text',
            'created_at',
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
    })
        .then(dbQuestionData => {
            // pass a single object into the homepage template
            const questions = dbQuestionData.map(question => question.get({ plain: true }));
            
            res.render('askDevs', {
                questions,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/question/:id', (req, res) => {
    Question.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'question_text',
            'created_at',
        ],
        include: [
            {
                model: Answer,
                attributes: ['id', 'answer_text', 'question_id', 'created_at'],
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
    })
        .then(dbQuestionData => {
            if (!dbQuestionData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }

            const question = dbQuestionData.get({ plain: true });

            res.render('single-question', { 
                question,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;