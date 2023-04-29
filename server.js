const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Define your server routes here
app.get('/', (req, res) => {
  res.send('Hello, World!');
  res.sendFile('index.html', {'root': 'public'});
});

// Listen for requests on port 3000
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});