const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;
const DATA_FILE = './todos.json';

// Initialize data file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const url = req.url;
  const method = req.method;

  if (url === '/api/todos') {
    if (method === 'GET') {
      const todos = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(todos));
    } else if (method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        const { text } = JSON.parse(body);
        const todos = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        const newTodo = { id: Date.now(), text, completed: false };
        todos.push(newTodo);
        fs.writeFileSync(DATA_FILE, JSON.stringify(todos));
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newTodo));
      });
    } else if (method === 'PUT') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        const { id, completed } = JSON.parse(body);
        const todos = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        const todoIndex = todos.findIndex(t => t.id === id);
        if (todoIndex !== -1) {
          todos[todoIndex].completed = completed;
          fs.writeFileSync(DATA_FILE, JSON.stringify(todos));
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      });
    } else if (method === 'DELETE') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        const { id } = JSON.parse(body);
        const todos = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        const filteredTodos = todos.filter(t => t.id !== id);
        fs.writeFileSync(DATA_FILE, JSON.stringify(filteredTodos));
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      });
    }
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});