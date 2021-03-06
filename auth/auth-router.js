const router = require('express').Router();
const db = require('../database/dbConfig');
const bcrypt = require('bcryptjs');
const restricted = require('./authenticate-middleware');

// helpers



router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  console.log(user);
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  add(user)
    .then(saved => {
      res.status(200).json({saved})
    })
    .catch(err => {
      res.status(500).json({err});
    }); 
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;
  console.log("Username, pass: ", username, password);

  findBy({username})
    .first()
    .then(user => {
      // console.log("User: ", user);
      if(user && bcrypt.compareSync(password, user.password)){
          req.session.user = user;
          res.status(200).json({ message: `Welcome ${user.username}!`, session: req.session });
      } else {
          res.status(401).json({ message: `Invalid Cridentials` });
      }
  })
  .catch(err => {
      res.status(500).json({ err: err.message })
  })
});

module.exports = router;

//helpers 

function find(){
  return db('users')
      .select('id', 'username', 'password');
};

function findBy(filter){
  return db('users')
      .select('id', 'username', 'password')
      .where(filter);
};

function add(user){
  return db('users')
      .insert(user)
      .then(ids => {
          const [id] = ids;
          return findById(id);
      });
};

function findById(id){
  return db('users')
      .select('id', 'username')
      .where({ id })
      .first();
};

function remove(id){
  return db('users')
      .where({ id: Number(id) })
      .del()
}