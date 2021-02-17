const router = require('express').Router();
const { Question, User, Answer, Tag, QuestionTag } = require('../../models');
const withAuth = require('../../utils/auth');

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

// find by user
router.get('/my-questions/', (req, res) => {
  User.findOne({
      where: {
        id: req.session.user_id
      },
      include: [
        {
          model: Question,
          attributes: ['id', 'question_text', 'created_at'],
        },
        {
            model: Answer,
            attributes: ['id', 'answer_text', 'question_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
      ]
  })
      .then(dbUserData => {
          const user = dbUserData.get({ plain: true });
          res.render('my-questions', {
              user,
              loggedIn: req.session.loggedIn
          });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

// find by id
router.get('/questions/:id', (req, res) => {
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
                res.status(404).json({ message: 'No Question found with this id' });
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

// 
router.get('/edit/:id', withAuth, (req, res) => {
  Question.findByPk(req.params.id, {
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
  })
    .then(dbQuestionData => {
      if (dbQuestionData) {
        const question = dbQuestionData.get({ plain: true });
        
        res.render('edit-question', {
          question,
          loggedIn: true
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
    Question.findByPk(req.params.id, {
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
    })
      .then(dbQuestionData => {
        if (dbQuestionData) {
          const question = dbQuestionData.get({ plain: true });
          
          res.render('edit-question', {
            question,
            loggedIn: true
          });
        } else {
          res.status(404).end();
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
});

module.exports = router;