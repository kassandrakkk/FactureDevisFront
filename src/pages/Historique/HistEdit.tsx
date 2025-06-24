import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar';

interface User {
  name: string;
}

interface Historique {
  id: string;
  user_id: number;
  type_operation: string;
  changements: string;
  date_action: string;
  user?: User;
}

const HistoriqueList: React.FC = () => {
  const navigate = useNavigate();
  const { type } = useParams<{ type: string }>();
  const [historiques, setHistoriques] = useState<Historique[]>([]);

  useEffect(() => {
    const savedHistoriques = localStorage.getItem('historiques');
    if (savedHistoriques) {
      setHistoriques(JSON.parse(savedHistoriques));
    }
  }, []);

  return (
    <div className="flex w-full h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 min-w-0 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Historique des modifications pour {type === 'devis' ? 'Devis' : 'Facture'}
          </h2>
          <button
            onClick={() => navigate(`/${type === 'devis' ? 'devis' : 'factures'}`)}
            className="text-gray-600 hover:text-blue-600 flex items-center"
          >
            <span className="mr-2">⬅</span> Retour
          </button>
        </header>
        <div className="bg-white rounded-lg shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-800">
                  <th className="p-4 border border-gray-300 text-left">Utilisateur</th>
                  <th className="p-4 border border-gray-300 text-left">Date</th>
                  <th className="p-4 border border-gray-300 text-left">Type d'opération</th>
                  <th className="p-4 border border-gray-300 text-left">Changements</th>
                </tr>
              </thead>
              <tbody>
                {historiques.map((historique) => (
                  <tr key={historique.id} className="border-b border-gray-300">
                    <td className="p-4">{historique.user?.name || 'Utilisateur inconnu'}</td>
                    <td className="p-4">{new Date(historique.date_action).toLocaleString('fr-FR')}</td>
                    <td className="p-4">{historique.type_operation}</td>
                    <td className="p-4">
                      <pre>{JSON.stringify(JSON.parse(historique.changements || '{}'), null, 2)}</pre>
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

export default HistoriqueList;
