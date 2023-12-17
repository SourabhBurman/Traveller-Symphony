const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const cors = require('cors');

const secretKey = '967c0c521269cff2f49e23c6c3ccb684e26b5a305e8e1517e9b834f83ce414f9';
const app = express();
const port = 3000; // choose your desired port

app.use(cors());
app.use(bodyParser.json());

// Load users from users.json
const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));

app.get('/', (req, res) => {
    res.send('Hello, your server is running!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


  
// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(email, token); 
    const user = users.find(u => u.email === email);

    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

  // Generate JWT token
  const token = jwt.sign({ email }, secretKey);
  console.log('Generated Token:', token); 

  res.json({ token });
});

// Signup route
app.post('/signup', (req, res) => {
    const { name, email, passwordSignUp } = req.body;

    // Check if the user already exists by email
    const userExists = users.some(u => u.email === email);

    if (userExists) {
        return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Add the new user
    const newUser = { name, email, password: passwordSignUp }; // Add this line
    users.push(newUser);

    // Save the updated users array to users.json
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2), 'utf8');

    // Generate JWT token for the new user
    const token = jwt.sign({ email }, secretKey);

    res.json({ token });
});

// Protected route example usage:
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    req.user = user;
    next();
  });
}
