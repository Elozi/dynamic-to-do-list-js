
 document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Add task on button click
 addButton.addEventListener('click', () => {
    addTask();
  });

  // Add task on Enter key
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // Load tasks from localStorage
  loadTasks();

  // Main function to add task
  function addTask(taskTextFromStorage = null, save = true) {
    const taskText = taskTextFromStorage || taskInput.value.trim();

    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    // Create <li> and set its text
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create remove button
    removeBtn.classList.add('remove-btn');

    // Remove button click handler
    removeBtn.onclick = () => {
      taskList.removeChild(li);
      removeFromStorage(taskText);
    };

    // Append remove button to li, then li to ul
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Save to localStorage if not loading from saved tasks
    if (save && !taskTextFromStorage) {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      storedTasks.push(taskText);
      localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Clear input only if task was added manually
    if (!taskTextFromStorage) {
      taskInput.value = '';
    }
  }

  // Load tasks from localStorage
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(task => addTask(task, false));
  }

  // Remove from localStorage
  function removeFromStorage(taskToRemove) {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks = tasks.filter(task => task !== taskToRemove);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
});
