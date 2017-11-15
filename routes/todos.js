const   express = require('express'),
        router = express.Router(),
        db = require('../models');

router.get('/', function(req, res){
    db.Todo.find()
        .then(todos => {
            res.json(todos);
        })
        .catch(err => {
            res.send(err);
        })
});

router.post('/', function(req, res){
    db.Todo.create(req.body)
        .then(function(newTodo){
            res.status(201).json(newTodo);
        })
        .catch(function(err){
            res.send(err);
        })
});

router.get('/:todoId', function(req, res){
    db.Todo.findById(req.params.todoId)
        .then(function(foundTodo){
            res.json(foundTodo);
        })
        .catch(function(err){
            res.send(err);
        })
});

router.put('/:todoId', function(req, res){
    db.Todo.findOneAndUpdate(
        { _id : req.params.todoId },
        req.body,
        { new : true }
    )
    .then(function(todo){
        res.json(todo);
    })
    .catch(function(err){
        res.send(err);
    })
});

router.delete('/:todoId', function(req, res){
    db.Todo.findOneAndRemove(
        { _id : req.params.todoId}
    )
    .then(function(todo){
        res.json({message: 'We deleted it!'})
    })
    .catch(function(err){
        res.send(err);
    });
});

module.exports = router;