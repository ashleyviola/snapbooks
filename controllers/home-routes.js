// const res = require('express/lib/response');
const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Project, Client } = require("../models");

// include catch error
router.get('/', (req, res) => {
  // console.log('======================');
  // Post.findAll({
  //   attributes: [
  //     'id',
  //     'post_url',
  //     'title',
  //     'created_at',
  //     [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
  //   ],
  //   include: [
  //     {
  //       model: Comment,
  //       attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
  //       include: {
  //         model: User,
  //         attributes: ['username']
  //       }
  //     },
  //     {
  //       model: User,
  //       attributes: ['username']
  //     }
  //   ]
  // })
  // .then(dbPostData => {
  // const posts = dbPostData.map(post => post.get({ plain: true }));

  res.render('homepage');
  // .catch(err => {
  //   console.log(err);
  //   res.status(500).json(err);
  // });
});

// user login
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/logout', (req, res) => {
 
  res.render('logout');
 
});
module.exports = router;
