// server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const fs = require('fs');
const secretKey = '967c0c521269cff2f49e23c6c3ccb684e26b5a305e8e1517e9b834f83ce414f9';
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const usersFilePath = 'users.json';

if (!fs.existsSync(usersFilePath)) {
  fs.writeFileSync(usersFilePath, '[]', 'utf-8');
}

// Endpoint for user signup
app.post('/signup', (req, res) => {
  const { name, emailSignUp, passwordSignUp } = req.body;

  // Read the existing users from the JSON file
  const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

  // Check if the email is already registered
  if (users.find(user => user.email === emailSignUp)) {
    return res.status(400).json({ message: 'Email is already registered' });
  }

  // Create a new user
  const newUser = { name, email: emailSignUp, password: passwordSignUp };
  users.push(newUser);

  // Write the updated users array back to the JSON file
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');

  // Generate a JWT token
  const token = jwt.sign({ userId: newUser.email }, secretKey , { expiresIn: '1h' });

  res.json({ token });
});

// Endpoint for user login
app.post('/login', (req, res) => {
  const { emailSignIn, passwordSignIn } = req.body;

  // Read the existing users from the JSON file
  const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

  // Find the user in the users array
  const user = users.find(u => u.email === emailSignIn && u.password === passwordSignIn);

  if (user) {
    // Generate a JWT token
    const token = jwt.sign({ userId: user.email }, secretKey , { expiresIn: '1h' });

    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
