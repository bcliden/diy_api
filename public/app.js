$(document).ready(function(){
    $.getJSON("/api/todos")
    .then(addTodos)
    .catch(err => console.log(err));

    $('#todoInput').keypress(function(event){
        if(event.which == 13){
            createTodo($(this).val());
        }
    });

    $('.list').on('click', 'li', function(e){
        updateTodo($(this));
    })

    $('.list').on('click', 'span', function(e){
        e.stopPropagation();
        removeTodo($(this).parent())
    });

});

function addTodos(todos){
    todos.forEach(addTodo);
}

function addTodo(todo){
    let newTodo = $(`<li class=task>${todo.name}<span>X</span></li>`);
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed);
    if(todo.completed) $(newTodo).addClass('done');
    $('.list').append(newTodo);
}

function createTodo(val){
    $.post("/api/todos", {name: [val]})
    .then(newTodo => {
        clearInput();
        addTodo(newTodo);
    })
    .catch(err => console.log(err));
}

function updateTodo(todo){
    let isDone = !todo.data('completed');
    $.ajax({
        method: 'PUT',
        url: '/api/todos/' + todo.data('id'),
        data: {completed: isDone}
    })
    .then(updatedTodo => {
        todo.data('completed', isDone);
        todo.toggleClass('done');
    })
    .catch(err => console.log(err));
}

function removeTodo(todo){
    $.ajax({
        method: 'DELETE',
        url: '/api/todos/' + todo.data('id')
    })
    .then(res => {
        console.log(res);
        todo.remove();
    })
    .catch(err => console.log(err));
}

function clearInput(){
    $('#todoInput').val('');
}