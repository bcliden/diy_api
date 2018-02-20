const list = document.querySelector('.list');
const todoInput = document.getElementById('todoInput');

document.addEventListener('DOMContentLoaded', () => {
    axios.get('/api/todos')
        // .then(addTodos)
        .then(response => addTodos(response.data))        
        .catch(err => console.error(err));
});

todoInput.addEventListener('keydown', function(e){
    if(event.which == 13){
        createTodo(e.target.value)
    }
});

list.addEventListener('click', function(e){
    if(e.target && e.target.matches('li.task')){
        updateTodo(e.target);
    }
});

list.addEventListener('click', function(e){
    e.stopPropagation();
    if(e.target && e.target.matches('span')){
        removeTodo(e.target.parentNode);
    }
})

function addTodos (todos) {
    todos.forEach(addTodo);
};

function addTodo (todo) {
    let newTodo = document.createElement('li');
    newTodo.innerHTML = todo.name + "<span>X</span>";
    newTodo.classList.add('task');
    newTodo.dataset._id = todo._id;
    if(todo.completed) newTodo.classList.add('done');
    
    list.appendChild(newTodo);
};

function createTodo(val) {
    axios.post('/api/todos', { name: val })
        .then(response => {
            clearInput();
            addTodo(response.data);
        })
        .catch(err => console.error(err));
};

function updateTodo (todo) {
    let url = `/api/todos/${todo.dataset._id}`;
    let flipDone = !todo.classList.contains('done');
    let data = { completed: flipDone };
    axios.put(url, data)
        .then(todo.classList.toggle('done'))
        .catch(err => console.error(err));
};

function removeTodo (todo) {
    let url = `/api/todos/${todo.dataset._id}`;
    axios.delete(url)
        .then(todo.parentNode.removeChild(todo))
        .catch(err => console.error(err));
}

function clearInput () {
    document.getElementById('todoInput').value = '';
};
