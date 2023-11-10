

// Selecão de elementos 
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');

// Funções 

const saveTodo = (text) => {
  const todo = document.createElement('div');
  todo.classList.add('todo');

  const todoTitle = document.createElement('h3');
  todoTitle.innerText = text;
  todo.appendChild(todoTitle);

  
  const doneBtn = document.createElement('button');
  doneBtn.classList.add('finish-todo');
  doneBtn.innerHTML = '<i class="fas fa-check"></i>';
  todo.appendChild(doneBtn);

  const editBtn = document.createElement('button');
  editBtn.classList.add('edit-todo');
  editBtn.innerHTML = '<i class="fas fa-pen"></i>';
  todo.appendChild(editBtn);

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('remove-todo');
  deleteBtn.innerHTML = '<i class="fas fa-xmark"></i>';
  todo.appendChild(deleteBtn);


  todoList.appendChild(todo);
  todoInput.value = '';
  todoInput.focus();
}

const toggleForms = () => {
  editForm.classList.toggle('hide');
  todoForm.classList.toggle('hide');
  todoList.classList.toggle('hide');
 }


// Eventos 

todoForm.addEventListener('submit', event => {
 event.preventDefault();

 const inputValue = todoInput.value

 if (inputValue) {

  saveTodo(inputValue)
 }
});

todoList.addEventListener('click', event => {
  const targetEl = event.target;
  const parentEl = targetEl.closest('.div');

  if (targetEl.classList.contains('finish-todo')) {
    parentEl.classList.toggle('done');
  }

  if (targetEl.classList.contains('remove-todo')) {
    parentEl.remove();
  }

  if (targetEl.classList.contains('edit-todo')) {
    toggleForms();
  }
});

cancelEditBtn.addEventListener('click', event => {
  event.preventDefault();
  toggleForms();
}); 
