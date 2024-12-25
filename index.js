const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');
const filterButtons = document.querySelectorAll('.filter-btn');

let todos = [];

// Add Task
addButton.addEventListener('click', () => {
  const task = todoInput.value.trim();
  if (task) {
    todos.push({ text: task, completed: false });
    todoInput.value = '';
    renderTodos();
  }
});

// Delete Task
const deleteTask = (index) => {
  todos.splice(index, 1);
  renderTodos();
};

// Toggle Task Completion
const toggleTask = (index) => {
  todos[index].completed = !todos[index].completed;
  renderTodos();
};

// Filter Tasks
filterButtons.forEach((btn) =>
  btn.addEventListener('click', (e) => {
    filterButtons.forEach((b) => b.classList.remove('active'));
    e.target.classList.add('active');
    renderTodos();
  })
);

// Render To-Do List
const renderTodos = () => {
  const filter = document.querySelector('.filter-btn.active').dataset.filter;
  todoList.innerHTML = '';

  todos
    .filter((todo) => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true; // 'all'
    })
    .forEach((todo, index) => {
      const li = document.createElement('li');
      li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
      li.innerHTML = `
        <span onclick="toggleTask(${index})">${todo.text}</span>
        <button onclick="deleteTask(${index})">Delete</button>
      `;
      todoList.appendChild(li);
    });
};
