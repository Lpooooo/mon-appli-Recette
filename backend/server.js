const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const sha256 = require('js-sha256').sha256;
const ratingsRoutes = require('./routes/ratings');
const recipesRoutes = require('./routes/recette');

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to the MySQL database');
    connection.release();
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
})();

const JWT_SECRET = process.env.JWT_SECRET || 'secret key';

// Login endpoint (corrected with bcrypt)
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await pool.execute(
      'SELECT * FROM Users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      console.log('Email or password incorrect');
      return res.status(401).json({ message: 'Email or password incorrect' });
    }

    const user = users[0];

    // Hash the entered password and compare with the hashed password in the database
    const isMatch = sha256(password) === user.password;
    
    if (isMatch) {
      const token = jwt.sign(
        { id: user.id, email: user.email, name: user.name},
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          nom_famille: user.nom_famille
        }
      });
    } else {
      res.status(401).json({ message: 'Email or password incorrect' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

//  endpoint
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, nom_famille } = req.body;

    
    const [existingUsers] = await pool.execute(
      'SELECT * FROM Users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    const hashedPassword = sha256(password);

    const [result] = await pool.execute(
      'INSERT INTO Users (name, email, password, nom_famille) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, nom_famille]
    );

    const token = jwt.sign(
      { id: result.insertId, email, name },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      token,
      user: {
        id: result.insertId,
        name,
        email,
        nom_famille
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Middleware 
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token manquant' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalide' });
    }
    req.user = user;
    next();
  });
};

app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const [users] = await pool.execute(
      'SELECT id, name, email, nom_famille FROM Users WHERE id = ?',
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.json(users[0]);
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

app.use('/api/ratings', ratingsRoutes);

app.use('/api/recette', recipesRoutes);

const PORT = 3030;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

