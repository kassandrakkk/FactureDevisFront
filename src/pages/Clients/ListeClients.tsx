
import * as React from 'react';
import Sidebar from '../../Components/Sidebar';
import RecentClientsTable from '../../Components/RecenteClientsTable';

const ListeClients: React.FC = () => {
  const recentClients = [
    { id: 1, nom: 'Jean', prenom: 'Dupont', mail: 'jean@example.com' },
    { id: 2, nom: 'Marie', prenom: 'Durand', mail: 'marie@example.com' },
    { id: 3, nom: 'Pierre', prenom: 'Martin', mail: 'pierre@example.com' },
  ];

  return (
    <div className="flex w-full h-screen bg-gray-100">
      <Sidebar />
      
        <div className="bg-white rounded-xl shadow-lg p-6">
          <RecentClientsTable clients={recentClients} />
        </div>
      
    </div>
  );
};

export default ListeClients;
