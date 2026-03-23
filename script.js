// Task Manager Application

document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('add-task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const filterAllBtn = document.getElementById('filter-all');
    const filterCompletedBtn = document.getElementById('filter-completed');
    const filterPendingBtn = document.getElementById('filter-pending');

    let currentFilter = 'all'; // 'all', 'completed', 'pending'

    // Load tasks from localStorage
    loadTasks();

    // Add task event listener
    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const taskText = taskInput.value.trim();

        if (!taskText) {
            alert('任务内容不能为空，请输入有效任务。');
            taskInput.value = '';
            taskInput.focus();
            return;
        }

        addTask(taskText);
        taskInput.value = '';
        saveTasks();
        applyFilter();
    });

    // Filter button event listeners
    filterAllBtn.addEventListener('click', function() {
        setActiveFilter('all');
    });

    filterCompletedBtn.addEventListener('click', function() {
        setActiveFilter('completed');
    });

    filterPendingBtn.addEventListener('click', function() {
        setActiveFilter('pending');
    });

    function setActiveFilter(filter) {
        currentFilter = filter;
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`filter-${filter}`).classList.add('active');
        applyFilter();
    }

    function applyFilter() {
        const tasks = taskList.querySelectorAll('.task-item');
        tasks.forEach(task => {
            const isCompleted = task.classList.contains('completed');
            let show = false;
            if (currentFilter === 'all') {
                show = true;
            } else if (currentFilter === 'completed') {
                show = isCompleted;
            } else if (currentFilter === 'pending') {
                show = !isCompleted;
            }
            task.style.display = show ? 'flex' : 'none';
        });
    }

    // Function to add a task
    function addTask(text, completed = false, id = Date.now()) {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        taskItem.dataset.id = id;

        if (completed) {
            taskItem.classList.add('completed');
        }

        taskItem.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${completed ? 'checked' : ''} aria-label="Mark task as completed">
            <span class="task-text">${text}</span>
            <div class="task-actions">
                <button class="delete-btn" aria-label="Delete task">Delete</button>
            </div>
        `;

        // Checkbox event listener
        const checkbox = taskItem.querySelector('.task-checkbox');
        checkbox.addEventListener('change', function() {
            taskItem.classList.toggle('completed');
            saveTasks();
            applyFilter();
        });

        // Delete button event listener
        const deleteBtn = taskItem.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function() {
            taskItem.remove();
            saveTasks();
            applyFilter();
        });

        taskList.appendChild(taskItem);
    }

    // Function to save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        const taskItems = taskList.querySelectorAll('.task-item');
        taskItems.forEach(item => {
            const text = item.querySelector('.task-text').textContent;
            const completed = item.classList.contains('completed');
            const id = item.dataset.id;
            tasks.push({ text, completed, id });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTask(task.text, task.completed, task.id);
        });
        applyFilter();
    }
});