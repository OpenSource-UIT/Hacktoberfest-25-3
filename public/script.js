// BUG: No error handling for API calls
class TodoApp {
    constructor() {
        this.todos = [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.loadTodos();
        this.bindEvents();
    }

    bindEvents() {
        document.getElementById('addBtn').addEventListener('click', () => {
            const input = document.getElementById('todoInput');
            const text = input.value.trim();
            
            if (text) {
                this.addTodo(text);
                input.value = '';
            }
        });

        document.getElementById('todoInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('addBtn').click();
            }
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });
    }

    async loadTodos() {
        try {
            const response = await fetch('/api/todos');
            this.todos = await response.json();
            this.render();
        } catch (error) {
            console.error('Error loading todos:', error);
        }
    }

    async addTodo(text) {
        try {
            const response = await fetch('/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text })
            });
            
            if (response.ok) {
                const newTodo = await response.json();
                this.todos.push(newTodo);
                this.render();
            }
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    }

    async updateTodo(id, updates) {
        try {
            const response = await fetch(`/api/todos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updates)
            });
            
            if (response.ok) {
                const updatedTodo = await response.json();
                const index = this.todos.findIndex(t => t.id === id);
                if (index !== -1) {
                    this.todos[index] = updatedTodo;
                    this.render();
                }
            }
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    }

    async deleteTodo(id) {
        try {
            const response = await fetch(`/api/todos/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                this.todos = this.todos.filter(t => t.id !== id);
                this.render();
            }
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        this.render();
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(todo => !todo.completed);
            case 'completed':
                return this.todos.filter(todo => todo.completed);
            default:
                return this.todos;
        }
    }

    render() {
        const todoList = document.getElementById('todoList');
        const filteredTodos = this.getFilteredTodos();
        
        todoList.innerHTML = '';
        
        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            
            li.innerHTML = `
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
                <span class="todo-text">${todo.text}</span>
                <div class="todo-actions">
                    <button class="edit-btn" onclick="todoApp.editTodo(${todo.id})">Edit</button>
                    <button class="delete-btn" onclick="todoApp.deleteTodo(${todo.id})">Delete</button>
                </div>
            `;
            
            li.querySelector('.todo-checkbox').addEventListener('change', (e) => {
                this.updateTodo(todo.id, { completed: e.target.checked });
            });
            
            todoList.appendChild(li);
        });
        
        this.updateStats();
    }

    updateStats() {
        const total = this.todos.length;
        const active = this.todos.filter(t => !t.completed).length;
        const completed = this.todos.filter(t => t.completed).length;
        
        document.getElementById('totalCount').textContent = `Total: ${total}`;
        document.getElementById('activeCount').textContent = `Active: ${active}`;
        document.getElementById('completedCount').textContent = `Completed: ${completed}`;
    }

    editTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            const newText = prompt('Edit todo:', todo.text);
            if (newText && newText.trim() !== '') {
                this.updateTodo(id, { text: newText.trim() });
            }
        }
    }
}

const todoApp = new TodoApp();
