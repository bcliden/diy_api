const list = document.querySelector('#list');
const todoInput = document.getElementById('todoInput');

document.addEventListener('DOMContentLoaded', function(){
    fetch('/api/todos')
    .then(response => response.json())
    .then(addTodos)
    .catch(err => console.log(err));

    todoInput.addEventListener('keydown', function(e){
        if(event.which == 13){
            console.log(e.target.value)
            createTodo(e.target.value)
        }
    })

    list.addEventListener('click', function(e){
        if(e.target && e.target.matches('li.task')){
            updateTodo(e.target);
        }
    })

    list.addEventListener('click', function(e){
        e.stopPropagation();
        if(e.target && e.target.matches('span')){
            removeTodo(e.target.parentNode);
        }
    })
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
    list.appendChild(newTodo);
}

function createTodo(val){
    let url = `/api/todos/`
    let data = { name: val }
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(newTodo => {
        clearInput();
        addTodo(newTodo);
    })
    .catch(err => console.log(err))
}

function updateTodo(todo){
    let url = `/api/todos/${todo.dataset._id}`;
    let flipDone = !todo.classList.contains('done');
    let data = { completed: flipDone };
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(updatedTodo => {
        todo.classList.toggle('done');        
    })
    .catch(err => console.log(err));
}

function removeTodo(todo){
    let url = `/api/todos/${todo.dataset._id}`;
    console.log(todo.dataset._id.toString())
    let childTodo = document.querySelector(`[data-_id="${todo.dataset._id}"]`);
    console.log(childTodo);
    fetch(url, {
        method: 'DELETE',
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        todo.parentNode.removeChild(childTodo)
    })
}

function clearInput(){
    document.getElementById('todoInput').value = '';
}