const express = require('express');
const mysql = require('mysql2/promise');

const router = express.Router();

// Créez une connexion à la base de données
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// Route pour enregistrer une note
router.post('/', async (req, res) => {
  const { mealId, userId, rating } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO Ratings (meal_id, user_id, rating) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE rating = ?',
      [mealId, userId, rating, rating]
    );
    res.status(201).json({ id: result.insertId, mealId, userId, rating });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de la note:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;