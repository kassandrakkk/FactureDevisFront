
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/ProductLogo.png'; // Ajustez le chemin et renommez le fichier si nécessaire

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Superposition semi-transparente */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-4xl font-bold mb-6">Bienvenue </h1>
        <p className="text-lg mb-8">Gérez vos devis, factures et clients facilement.</p>
        <div className="space-x-4">
          <button
            onClick={() => navigate('/inscription')}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Inscription
          </button>
          <button
            onClick={() => navigate('/connexion')}
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Connexion
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
