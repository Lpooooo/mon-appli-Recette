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

// Route pour enregistrer une recette
router.post('/', async (req, res) => {
  const { title, ingredients, instructions, photo } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO recette (title, ingredients, instructions, photo) VALUES (?, ?, ?, ?)',
      [title, ingredients, instructions, photo]
    );
    res.status(201).json({ id: result.insertId, title, ingredients, instructions, photo });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de la recette:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;