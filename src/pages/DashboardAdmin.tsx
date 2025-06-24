

import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import dashboardImage from '../assets/image.jpg'; 
import StatCard from '../Components/StatCard';
import Sidebar from '../Components/Sidebar';
import RecentClientsTable from '../Components/RecenteClientsTable';


const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    { title: 'Total des devis', value: '01', icon: '📄' },
    { title: 'Factures impayé', value: '02', icon: '📄' },
    { title: 'Facture Payé', value: '01', icon: '💰' },
  ];

 const recentClients = [
  { id: 1, nom: 'KAKANAKOU', prenom: 'Kassandra', mail: 'Kassandra@kakanakougmail.cm' },
  { id: 2, nom: 'HOULO', prenom: 'Ruth-Esther', mail: 'HOULO@RuthEsthergmail.cm' },
  { id: 3, nom: 'Doassa', prenom: 'Luc', mail: 'Doassa@Lucgmail.cm' },
];


  const handleLogout = () => {
    console.log('Déconnexion');
    navigate('/connexion'); 
  };

  return (
    <div className="flex w-full h-screen bg-gray-200">
     
      <Sidebar />

      <main className="flex-1 min-w-0 p-8 overflow-y-auto">
        {/* En-tête */}
        <header className="flex justify-end mb-6">
          <button onClick={handleLogout} className="text-gray-600 hover:text-blue-600">
            <span className="mr-2">👤</span> Déconnexion
          </button>
           <button onClick={handleLogout} className="text-gray-600 hover:text-blue-600">
            <span className="mr-2">🔔</span> 
          </button>
        </header>

        {/* Section principale avec image en-tête */}
        <div className="w-full h-48 mb-6">
          <img src={dashboardImage} alt="Dashboard Header" className="w-full h-full object-cover rounded-lg" />
        </div>

        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {stats.map((stat, index) => (
            <StatCard key={index} title={stat.title} value={stat.value} icon={stat.icon} />
          ))}
        </div>

        {/* Tableau des utilisateurs récents */}
        <RecentClientsTable clients={recentClients} />
      </main>
    </div>
  );
};

export default AdminDashboard;