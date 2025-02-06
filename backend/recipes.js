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

// Endpoint pour récupérer les recettes avec un paramètre de recherche
app.get('/api/recettes', async (req, res) => {
    const search = req.query.search || '';
    try {
      const [rows] = await pool.query('SELECT * FROM Recettes WHERE nom LIKE ?', [`%${search}%`]);
      res.json(rows);
    } catch (error) {
      console.error('Erreur lors de la récupération des recettes:', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});   




