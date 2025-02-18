import React, { useState, useEffect } from 'react';
import { getRecettes } from '../services/recettes';

function MesRecettes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [recettes, setRecettes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await getRecettes(searchTerm);
      setRecettes(data);
    } catch (error) {
      setError('Erreur lors de la récupération des recettes');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    // Récupérer les recettes de l'utilisateur connecté au chargement du composant
    handleSearch();
  }, []);

  return (
    <div>
      <h1>Recherche de Recettes</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher des recettes..."
        />
        <button type="submit">Rechercher</button>
      </form>
      {loading && <div>Chargement...</div>}
      {error && <div>{error}</div>}
      <ul>
        {recettes.map((recette) => (
          <li key={recette.id}>{recette.nom}</li>
        ))}
      </ul>
    </div>
  );
}
export default MesRecettes;