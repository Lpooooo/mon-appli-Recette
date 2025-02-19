const express = require('express');
const mysql = require('mysql2/promise');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');

// Charger les variables d'environnement
dotenv.config({ path: path.join(__dirname, '../.env') });


// Vérifier que les variables d'environnement sont chargées
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_DATABASE) {
  console.error('Variables d\'environnement manquantes. Veuillez configurer le fichier .env');
  process.exit(1);
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// Middleware d'authentification amélioré
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token manquant' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'secret key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalide' });
    }
    req.user = user;
    next();
  });
};

// Appliquer l'authentification à toutes les routes
router.use(authenticateToken);

// Route pour enregistrer une recette
router.post('/', async (req, res) => {
  const { title, ingredients, instructions, photo } = req.body;
  const userId = req.user.id;

  try {
    const [result] = await pool.query(
      'INSERT INTO recette (title, ingredients, instructions, photo, user_id) VALUES (?, ?, ?, ?, ?)',
      [title, ingredients, instructions, photo, userId]
    );
    
    res.status(201).json({ 
      id: result.insertId, 
      title, 
      ingredients, 
      instructions, 
      photo, 
      user_id: userId 
    });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de la recette:', error);
    res.status(500).json({ message: 'Erreur serveur /' });
  }
});

router.get('/', async (req, res) => {
  const userId = req.user.id;

  try {
    const [recettes] = await pool.query('SELECT * FROM recette WHERE user_id = ?', [userId]);
    res.status(200).json(recettes);
  } catch (error) {
    console.error('Erreur lors de la récupération des recettes:', error); // Log de l'erreur
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route pour partager une recette
router.post('/share', async (req, res) => {
  const { recette } = req.body;
  const userId = req.user.id;
  
  
  try {
    const [result] = await pool.query(
      'INSERT INTO Partages (recette_id, sender_id, receiver_id) VALUES (?, ?, ?)',
      [recetteId, senderId, receiverId]
    );
    res.status(201).json({ message: 'Recette partagée avec succès' });
  } catch (error) {
    console.error('Erreur lors du partage de la recette:', error); // Log de l'erreur
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;