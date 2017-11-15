const   express = require('express'),
        router = express.Router(),
        helpers = require('../helpers/todos'),
        db = require('../models');

router.route('/')
    .get(helpers.getTodos)
    .post(helpers.createTodos)

router.route('/:todoId')
    .get(helpers.getTodo)
    .put(helpers.updateTodo)
    .delete(helpers.deleteTodo)

module.exports = router;