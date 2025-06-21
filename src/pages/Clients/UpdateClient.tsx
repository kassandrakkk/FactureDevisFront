
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar';
import FormInput from '../../Components/FormInput';

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

const EditClient: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [client, setClient] = React.useState<Client | null>(null);
  const [initialClient, setInitialClient] = React.useState<Client | null>(null);

  // Simuler une liste de clients (remplacez par une API plus tard)
  const [clients, setClients] = React.useState<Client[]>([
    { id: '1', nom: 'Dupont', prenom: 'Jean', email: 'dupont@example.com', ville: 'Paris', pays: 'France', code_postal: '75001', telephone: '0123456789' },
    { id: '2', nom: 'Martin', prenom: 'Sophie', email: 'martin@example.com', ville: 'Lyon', pays: 'France', code_postal: '69002', telephone: '0987654321' },
    { id: '3', nom: 'Lefevre', prenom: 'Pierre', email: 'lefevre@example.com', ville: 'Marseille', pays: 'France', code_postal: '13003', telephone: '0112233445' },
  ]);

  React.useEffect(() => {
    const foundClient = clients.find((c) => c.id === id);
    if (foundClient) {
      setClient({ ...foundClient });
      setInitialClient({ ...foundClient });
    }
  }, [id, clients]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (client) {
      const { name, value } = e.target;
      setClient({ ...client, [name]: value });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (client && initialClient) {
      setClients(clients.map((c) => (c.id === client.id ? client : c)));
      navigate('/client-list'); // Rediriger vers la liste des clients
    }
  };

  const handleCancel = () => {
    navigate('/client-list'); // Rediriger vers la liste des clients
  };

  if (!client) return <div className="text-gray-900 text-center p-8">Client non trouvé</div>;

  return (
    <div className="flex w-full h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 min-w-0 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
          <h2 className="text-3xl font-bold text-gray-900">Modifier un Client</h2>
          <button
            onClick={() => navigate('/client-list')}
            className="text-gray-600 hover:text-blue-700 flex items-center text-lg transition-colors"
          >
            <span className="mr-2">⬅</span> Retour
          </button>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Nom *"
                name="nom"
                value={client.nom}
                onChange={handleInputChange}
                required
                className="w-full"
              />
              <FormInput
                label="Prénom *"
                name="prenom"
                value={client.prenom}
                onChange={handleInputChange}
                required
                className="w-full"
              />
              <FormInput
                label="Email *"
                name="email"
                value={client.email}
                onChange={handleInputChange}
                type="email"
                required
                className="w-full"
              />
              <FormInput
                label="Téléphone *"
                name="telephone"
                value={client.telephone}
                onChange={handleInputChange}
                type="tel"
                required
                className="w-full"
              />
              <FormInput
                label="Ville *"
                name="ville"
                value={client.ville}
                onChange={handleInputChange}
                required
                className="w-full"
              />
              <FormInput
                label="Pays *"
                name="pays"
                value={client.pays}
                onChange={handleInputChange}
                required
                className="w-full"
              />
              <FormInput
                label="Code Postal *"
                name="code_postal"
                value={client.code_postal}
                onChange={handleInputChange}
                required
                className="w-full"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800 transition-colors"
              >
                Sauvegarder
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 bg-gray-400 text-white rounded-lg shadow-md hover:bg-gray-500 transition-colors"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditClient;
