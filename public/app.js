const list = document.querySelector('#list');
const todoInput = document.getElementById('todoInput');

document.addEventListener('DOMContentLoaded', function(){
    fetch('/api/todos')
    .then(response => response.json())
    .then(addTodos)
    .catch(err => console.log(err));

    // $.getJSON("/api/todos")
    // .then(addTodos)
    // .catch(err => console.log(err));

    todoInput.addEventListener('keydown', function(e){
        if(event.which == 13){
            console.log(e.target.value)
            createTodo(e.target.value)
        }
    })

    // $('#todoInput').keypress(function(event){
    //     if(event.which == 13){
    //         createTodo($(this).val());
    //     }
    // });

    // $('.list').on('click', 'li', function(e){
    //     console.log(e);
    //     updateTodo($(this));
    // })

    list.addEventListener('click', function(e){
        if(e.target && e.target.matches('li.task')){
            updateTodo(e.target);
        }
    })

    // $('.list').on('click', 'span', function(e){
    //     e.stopPropagation();
    //     removeTodo($(this).parent())
    // });

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
    
    // let newTodo = $(`<li class=task>${todo.name}<span>X</span></li>`);
    // newTodo.data('id', todo._id);
    // newTodo.data('completed', todo.completed);
    // if(todo.completed) $(newTodo).addClass('done');

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


    // $.post("/api/todos", {name: [val]})
    // .then(newTodo => {
    //     clearInput();
    //     addTodo(newTodo);
    // })
    // .catch(err => console.log(err));
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

    // let isDone = !todo.data('completed');
    // $.ajax({
    //     method: 'put',
    //     url: url,
    //     data: data
    // })
    // .then(updatedTodo => {
        // todo.data('completed', isDone);
        // todo.toggleClass('done');
    //     todo.classList.toggle('done');
        
    // })
    // .catch(err => console.log(err));
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


//     $.ajax({
//         method: 'DELETE',
//         url: '/api/todos/' + todo.data('id')
//     })
//     .then(res => {
//         console.log(res);
//         todo.remove();
//     })
//     .catch(err => console.log(err));
}

function clearInput(){
    document.getElementById('todoInput').value = '';
}