import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

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

// Endpoint pour partager une recette
app.post('/api/partages', async (req, res) => {
  const { recette_id, sender_id, receiver_id } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO Partages (recette_id, sender_id, receiver_id) VALUES (?, ?, ?)', [recette_id, sender_id, receiver_id]);
    res.json({ id: result.insertId, recette_id, sender_id, receiver_id });
  } catch (error) {
    console.error('Erreur lors du partage de la recette:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Endpoint pour récupérer les recettes partagées avec un utilisateur
app.get('/api/partages/:user_id', async (req, res) => {
  const { user_id } = req.params;
  try {
    const [rows] = await pool.query('SELECT Recettes.* FROM Recettes JOIN Partages ON Recettes.id = Partages.recette_id WHERE Partages.receiver_id = ?', [user_id]);
    res.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des recettes partagées:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});