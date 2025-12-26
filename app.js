// const express = require('express');
// const app = express();
// app.get('/', (req, res) => res.send('Hi from Dockerized Express!'));
// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Listening on ${port}`));



const express = require('express');
const app = express();

app.use(express.json()); // allow JSON body parsing

// In-memory storage (resets every restart)
let items = [
  { id: 1, name: "First item" },
  { id: 2, name: "Second item" }
];

// GET → return array of objects
app.get('/items', (req, res) => {
  console.log("getting items");
  res.json({
    success: true,
    data: items
  });
});

// POST → receive an object and return a response
app.post('/items', (req, res) => {
  const { name } = req.body;
    console.log("setting an item");
  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Name is required"
    });
  }

  const newItem = {
    id: items.length + 1,
    name
  };

  items.push(newItem);

  res.status(201).json({
    success: true,
    message: "Item added successfully!",
    data: newItem
  });
});

// Simple hello route
app.get('/', (req, res) => {
  res.send('Hello from Dockerized Express API!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));
