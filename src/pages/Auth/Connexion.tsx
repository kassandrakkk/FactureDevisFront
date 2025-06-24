import * as React from 'react';
import { useNavigate } from 'react-router-dom';

const Inscription: React.FC = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/DashboardAdmin');
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition duration-300 hover:scale-105">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Connexion</h2>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Votre email"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Mot de passe</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Votre mot de passe"
            />
          </div>

          <div className="flex justify-between items-center">
            <a href="/MDPOublié" className="text-sm text-blue-600 hover:underline">
              Mot de passe oublié ?
            </a>
          </div>

          <button
            type="button"
            onClick={handleRedirect}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Inscription;
