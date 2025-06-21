
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar';

interface Client {
  id: string;
  nom: string;
  prenom: string;
  email: string; // Mappé avec 'mail' de la migration
  ville: string;
  pays: string;
  code_postal: string;
  telephone: string;
}

const ClientList: React.FC = () => {
  const navigate = useNavigate();
  const [clients, setClients] = React.useState<Client[]>([
    { id: '1', nom: 'Dupont', prenom: 'Jean', email: 'dupont@example.com', ville: 'Paris', pays: 'France', code_postal: '75001', telephone: '0123456789' },
    { id: '2', nom: 'Martin', prenom: 'Sophie', email: 'martin@example.com', ville: 'Lyon', pays: 'France', code_postal: '69002', telephone: '0987654321' },
    { id: '3', nom: 'Lefevre', prenom: 'Pierre', email: 'lefevre@example.com', ville: 'Marseille', pays: 'France', code_postal: '13003', telephone: '0112233445' },
  ]); // Données initiales simulées

  const handleEdit = (id: string) => {
    navigate(`/edit-client/${id}`);
  };

  return (
    <div className="flex w-full h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 min-w-0 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
          <h2 className="text-3xl font-bold text-gray-900">Liste des Clients</h2>
          <button
            onClick={() => navigate('/add-client')}
            className="px-6 py-3 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800 transition-colors"
          >
            + Ajouter un Client
          </button>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700 border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border-b font-semibold">Nom</th>
                  <th className="px-4 py-2 border-b font-semibold">Prénom</th>
                  <th className="px-4 py-2 border-b font-semibold">Email</th>
                  <th className="px-4 py-2 border-b font-semibold">Ville</th>
                  <th className="px-4 py-2 border-b font-semibold">Pays</th>
                  <th className="px-4 py-2 border-b font-semibold">Code Postal</th>
                  <th className="px-4 py-2 border-b font-semibold">Téléphone</th>
                  <th className="px-4 py-2 border-b font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50 transition-colors border-b">
                    <td className="px-4 py-2">{client.nom}</td>
                    <td className="px-4 py-2">{client.prenom}</td>
                    <td className="px-4 py-2">{client.email}</td>
                    <td className="px-4 py-2">{client.ville}</td>
                    <td className="px-4 py-2">{client.pays}</td>
                    <td className="px-4 py-2">{client.code_postal}</td>
                    <td className="px-4 py-2">{client.telephone}</td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => handleEdit(client.id)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
                      >
                        Modifier
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientList;
