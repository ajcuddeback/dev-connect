const router = require('express').Router();
const { Post, User, Comment} = require('../../models');
const Like = require("../../models/Social_Models/Like")
const sequelize = require('../../config/connection');

// get all users
router.get('/', (req, res) => {
//   Group.findAll({
//     attributes: [
//         'id',
//         'group_title',
//         'group_text',
//         'group_zip',
//         [sequelize.literal('(SELECT COUNT(*) FROM group_users WHERE group.id = group_users.group_id)'), 'users']
//     ],
//     include: [
//         {
//             model: Event,
//             attributes: ['id', 'event_title', 'event_text', 'event_location', 'event_time'],
//         }
//     ]
// })
//     .then(dbGroupData => res.json(dbGroupData))
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     })
    Post.findAll({
        attributes: [
            'id',
            'created_at',
            'post_content'
        ],
      order: [['created_at', 'DESC']],
      include: [
        // Comment model here -- attached username to comment
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Like,
          },

      ]
    })
      .then(data => {
        console.log("*****************************************************************************************")
        console.log(data)
        res.json(data)})
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/:id', (req, res) => {
    Post.findOne({
      where: {

        id: req.params.id
      },
      attributes: [
        'id',
        'created_at',
        'post_content'
      ],
      include: [
     
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        }
      ]
    })
      .then(data => {
        if (!data) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        let isLiked = false;

        Like.findOne({
          where: {
            user_id: req.session.user_id, 
            post_id: req.params.id,
          }
        }).then(data=> {
          if(data){
            isLiked = true;
          }
        })
        data.isLiked = isLiked;
  
        console.log(data)
        res.json(data);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.post('/', (req, res) => {
    Post.create({
      post_content: req.body.post_content,
      user_id: req.session.user_id
    })
      .then(data => res.json(data))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.put('/:id', (req, res) => {
    Post.update({
        post_content: req.body.post_content
      },
      {
        where: {
          id: req.params.id
        }
      })
      .then(data => {
        if (!data) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(data);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  router.get('/like/:id', (req, res) =>{
    var isLiked = false;
     console.log(req.session.user_id)
     Like.findOne({
       where: {
         user_id: req.session.user_id, 
         post_id: req.params.id,

       }
     }).then(data => {
       if (data){
  
         Like.destroy({
          where: {
            user_id: req.session.user_id, 
            post_id: req.params.id,
          }
         }).then(data=>{
           res.send({
             isLiked:false
           })
         })
       }else{
         
        Like.create({
          post_id: req.params.id,
   
          user_id: req.session.user_id
        }).then(data => {
          res.send({
            isLiked:true
          })
         console.log(data);
       })
       .catch(err => {
         console.log(err);
         res.status(500).json(err);
       });

       }
      console.log(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });

  router.delete('/:id', (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(data => {
        if (!data) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(data);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;