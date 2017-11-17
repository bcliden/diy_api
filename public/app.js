const list = document.querySelector('#list');

document.addEventListener('DOMContentLoaded', function(){
    fetch('/api/todos')
    .then(response => response.json())
    .then(addTodos)
    .catch(err => console.log(err));

    // $.getJSON("/api/todos")
    // .then(addTodos)
    // .catch(err => console.log(err));

    $('#todoInput').keypress(function(event){
        if(event.which == 13){
            createTodo($(this).val());
        }
    });

    // $('.list').on('click', 'li', function(e){
    //     console.log(e);
    //     updateTodo($(this));
    // })

    document.getElementById("list")
    .addEventListener('click', function(e){
        if(e.target && e.target.matches('li.task')){
            updateTodo(e.target);
        }
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
    let newTodo = document.createElement('li');
    newTodo.innerHTML = todo.name + "<span>X</span>";
    newTodo.classList.add('task');
    newTodo.dataset._id = todo._id;
    if(todo.completed) newTodo.classList.add('done');
    
    // let newTodo = $(`<li class=task>${todo.name}<span>X</span></li>`);
    // newTodo.data('id', todo._id);
    // newTodo.data('completed', todo.completed);
    // if(todo.completed) $(newTodo).addClass('done');

    list.appendChild(newTodo);
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
    let url = `/api/todos/${todo.dataset._id}`;
    let data = {completed: true};
    fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            
        }
    })
    .then(res => res.json())
    .then(updatedTodo => console.log(updatedTodo))
    .catch(err => console.log(err));

    todo.classList.toggle('done');
    // let isDone = !todo.data('completed');
    // $.ajax({
    //     method: 'PUT',
    //     url: '/api/todos/' + todo.data('id'),
    //     data: {completed: isDone}
    // })
    // .then(updatedTodo => {
    //     todo.data('completed', isDone);
    //     todo.toggleClass('done');
    // })
    // .catch(err => console.log(err));
}

function removeTodo(todo){
    console.log(todo.dataset._id)
    
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
    document.getElementById('todoInput').value = '';
}