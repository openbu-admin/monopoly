'use strict';

var express = require('express');
var router = express.Router();
var Players = require('../model/model');

  router.get('/player', function(req, res){
      Players.find({}, function (err, player)
      {
          if (err){
              return res.status(500).json({message:err.message});
          }
          res.json({player: player});

      });

  });
router.post('/player/create', function (req, res){
        var player = req.body;
        player.deposit = 2500;
        player.bank = false;
        Players.create(player, function (err, player) {
           if (err){
               return res.status(500).json({err: err.message})
           }
        });
        res.json({message: 'Player created'});
    }
);

router.post('/player/delete/:id', function (req, res) {
    var id = req.params.id;
    Players.remove({_id: req.params.id}, function (err) {
        if (err){
            console.log('Удаление не произошло');
        } else {
            res.json({message: 'Player with id ' + id + ' remove.'});
        }
    });
});

router.post('/player/:id', function (req, res) {
    var id = req.params.id;
    Players.findById({_id: req.params.id}, function (err, player) {
        if (err){
            console.log('Удаление не произошло');
        } else {
            res.json({'player': player });
        }
    });
});

router.post('/player/login/:name', function (req, res) {
    var name = req.params.name;
    console.log(name);
    Players.find({name: name} ,function (err, player) {
        if (err){
            return res.status(500).json({err: "Name don't match!"});
        } else {
                res.json({'Player':player});
        }


        })
});


router.put('/player/:id', function (req, res) {
    var id = req.params.id;
    var player = req.body;
    if (player && player._id !== id){
        return res.status(500).json({err: "Id's don't match!"});
    }
    Players.findByIdAndUpdate(id, player, {new: true}, function (err, player) {
        if (err) {
            return res.status(500).json({err: err.message});
        }
    })
    res.json({'player':player, message:'Player update'});
});


//TODO: Add PUT route to update existing deposit player
//TODO: Add DELETE route to delete player
//TODO: Add POST to login bank person

module.exports = router;
