const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let todos = [
    { id: 1, text: 'Learn JavaScript', completed: false },
    { id: 2, text: 'Fix bugs in open source projects', completed: true }
];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/todos', (req, res) => {
    res.json(todos);
});

app.post('/api/todos', (req, res) => {
    const newTodo = {
        id: todos.length + 1, 
        text: req.body.text,
        completed: false
    };
    todos.push(newTodo);
    res.json(newTodo);
});

app.put('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    
    if (todo) {
        todo.text = req.body.text || todo.text;
        todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
        res.json(todo);
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

app.delete('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(t => t.id === id);
    
    if (index !== -1) {
        todos.splice(index, 1);
        res.json({ message: 'Todo deleted successfully' });
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
