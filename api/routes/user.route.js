const express = require('express');
const app = express();
const userRoutes = express.Router();

// Model
let User = require('../models/User');

// Add route
userRoutes.route('/add').post(function (req, res) {
  let user = new User(req.body);
  user.save()
    .then(user => {
      res.status(200).json({'User': 'User has been added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// Index route
userRoutes.route('/').get(function (req, res) {
  User.find(function (err, users){
    if(err){
      console.log(err);
    }
    else {
      res.json(users);
    }
  });
});

// Edit route
userRoutes.route('/:id').get(function (req, res) {
  let id = req.params.id;
  User.findById(id, function (err, product){
      res.json(product);
  });
});

//  Update route
userRoutes.route('/:id').post(function (req, res) {
  User.findById(req.params.id, function(err, user) {
    if (!user)
      res.status(404).send("Record not found");
    else {
      user.name = req.body.name;
      user.email = req.body.email;
      user.is_admin = req.body.is_admin;
      user.type = req.body.type;
      user.address = req.body.address;
      user.save().then(user => {
          res.json('Update complete');
      })
      .catch(err => {
        res.status(400).send(err);
      });
    }
  });
});

// Destroy route
userRoutes.route('/:id/delete').get(function (req, res) {
    User.findByIdAndRemove({_id: req.params.id}, function(err, product){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = userRoutes;
