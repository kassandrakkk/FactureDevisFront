
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [selectedEnterprise, setSelectedEnterprise] = React.useState<string>('Entreprise');

  const handleEnterpriseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const enterprise = e.target.value;
    setSelectedEnterprise(enterprise);
    // Redirection ou action basée sur l'entreprise sélectionnée
    if (enterprise === 'VictoriaJewelrys') {
      navigate('/dashboard-victoria'); 
    } else if (enterprise === 'Autres') {
      navigate('/dashboard-autres'); 
    }
    // gérer une API
  };

  const handleLogout = () => {
    console.log('Déconnexion');
    navigate('/Connexion');
  };

  return (
    <aside className="w-64 bg-sky-50  shadow-xl p-6">
      <div className="mb-8">
        <label htmlFor="enterprise-select" className="block text-sm font-medium text-gray-700 mb-1">
          Entreprise
        </label>
        <select
          id="enterprise-select"
          value={selectedEnterprise}
          onChange={handleEnterpriseChange}
          className="w-full p-2 text-2xl bg-sky-50 font-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
      
          <option value="VictoriaJewelrys">VictoriaJewelrys</option>
          <option value="Autres">Dcolsay</option>
          <option value="Entreprise">3k&Fils</option>
        </select>
      </div>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link to="/DashboardAdmin" className="flex items-center text-gray-600 hover:text-blue-600">
              <span className="mr-2">🏠</span> Tableau de bord
            </Link>
          </li>
          <li>
            <Link to="/ListeFactures" className="flex items-center text-gray-600 hover:text-blue-600">
              <span className="mr-2">📋</span> Factures
            </Link>
          </li>
          <li>
            <Link to="/ListeDevis" className="flex items-center text-gray-600 hover:text-blue-600">
              <span className="mr-2">📋</span> Devis
            </Link>
          </li>
          <li>
            <Link to="/listeArticles" className="flex items-center text-gray-600 hover:text-blue-600">
              <span className="mr-2">📋</span> Article
            </Link>
          </li>
          <li>
            <Link to="/AllClient" className="flex items-center text-gray-600 hover:text-blue-600">
              <span className="mr-2">📋</span> Clients
            </Link>
          </li>
          <li>
            <Link to="/HistEdit" className="flex items-center text-gray-600 hover:text-blue-600">
              <span className="mr-2">📋</span> Historique de modification
            </Link>
          </li>
          <li>
            <Link to="/parametre" className="flex items-center text-gray-600 hover:text-blue-600">
              <span className="mr-2">⚙️</span> Paramètre
            </Link>
          </li>
          <li>
            <button onClick={handleLogout} className="w-full text-left text-gray-600 hover:text-blue-600">
              <span className="mr-2">🚪</span> Déconnexion
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
