import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar';
import FormInput from '../../Components/FormInput'
import FormSelect from '../../Components/FormSelect';
import FormCheckbox from '../../Components/FormChekbox';
import FilterSection from '../../Components/FiltreSection';
import DevisItem from '../../Components/DevisItem';

interface Devis {
  numeroDevis: string;
  dateCreation: string;
  montantTotal: string;
  statut: string;        
}

const DevisDashboard: React.FC = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortBy, setSortBy] = React.useState('dateCreation');
  const [filterStatut, setFilterStatut] = React.useState('Tous');
  const [devisList, setDevisList] = React.useState<Devis[]>([
    { numeroDevis: 'DEV-001', dateCreation: '09 juin 2025', montantTotal: '30000', statut: 'Brouillon' },
    { numeroDevis: 'DEV-002', dateCreation: '08 juin 2025', montantTotal: '80000', statut: 'Validé' },
    { numeroDevis: 'DEV-003', dateCreation: '07 juin 2025', montantTotal: '55800', statut: 'Refusé' },
  ]);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [devisToDelete, setDevisToDelete] = React.useState<string | null>(null);
  const [showDetailsModal, setShowDetailsModal] = React.useState(false);
  const [selectedDevis, setSelectedDevis] = React.useState<Devis | null>(null);

  const filteredDevis = devisList
    .filter((devis) =>
      devis.numeroDevis.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatut === 'Tous' || devis.statut === filterStatut)
    )
    .sort((a, b) => (sortBy === 'dateCreation' ? new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime() : 0));

  const handleView = (numeroDevis: string) => {
    // Trouver le devis et afficher ses détails dans une modal
    const devis = devisList.find(d => d.numeroDevis === numeroDevis);
    if (devis) {
      setSelectedDevis(devis);
      setShowDetailsModal(true);
    }
  };

  const handleEdit = (numeroDevis: string) => {
    // Navigation vers la page d'édition du devis
    navigate(`/devis/${numeroDevis}/edit`);
  };

  const handleDeleteClick = (numeroDevis: string) => {
    // Afficher la modal de confirmation
    setDevisToDelete(numeroDevis);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (devisToDelete) {
      // Supprimer le devis de la liste
      setDevisList(prevList => 
        prevList.filter(devis => devis.numeroDevis !== devisToDelete)
      );
      
      // Réinitialiser les états
      setDevisToDelete(null);
      setShowDeleteModal(false);
      
      // Optionnel: Afficher un message de succès
      console.log(`Devis ${devisToDelete} supprimé avec succès`);
    }
  };

  const cancelDelete = () => {
    setDevisToDelete(null);
    setShowDeleteModal(false);
  };

  const closeDetailsModal = () => {
    setSelectedDevis(null);
    setShowDetailsModal(false);
  };

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'Validé': return 'text-green-600 bg-green-100';
      case 'Brouillon': return 'text-yellow-600 bg-yellow-100';
      case 'Refusé': return 'text-red-600 bg-red-100';
      case 'Signé': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="flex w-full h-screen bg-gray-200">
      <Sidebar />
      <main className="flex-1 min-w-0 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Liste des devis</h1>
          <h2 className="text-2xl font-bold text-gray-800">Total: ({filteredDevis.length})</h2>
          <button
            onClick={() => navigate('/CreateDevis')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Créer
          </button>
        </header>

        <div className="bg-gray-50 p-6 rounded-lg shadow-xl">
          <FilterSection
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortBy={sortBy}
            setSortBy={setSortBy}
            filterValue={filterStatut}
            setFilterValue={setFilterStatut}
            sortOptions={[
              { value: 'dateCreation', label: 'Date de création' },
              { value: 'montantTotal', label: 'Montant' },
            ]}
            filterOptions={[
              { value: 'Tous', label: 'Tous' },
              { value: 'Provisoire', label: 'Provisoires' },
              { value: 'Finalisé', label: 'Finalisés' },
              { value: 'Refusé', label: 'Refusés' },
              { value: 'Signé', label: 'Signés' },
            ]}
          />

          <div className="space-y-4">
            {filteredDevis.map((devis) => (
              <DevisItem
                key={devis.numeroDevis}
                numeroDevis={devis.numeroDevis}
                dateCreation={devis.dateCreation}
                montantTotal={devis.montantTotal}
                statut={devis.statut}
                onView={() => handleView(devis.numeroDevis)}
                onEdit={() => handleEdit(devis.numeroDevis)}
                onDelete={() => handleDeleteClick(devis.numeroDevis)}
              />
            ))}
          </div>
        </div>

        {/* Modal de détails du devis */}
        {showDetailsModal && selectedDevis && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  Détails du devis
                </h3>
                <button
                  onClick={closeDetailsModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Informations principales */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Numéro de devis
                    </label>
                    <p className="text-lg font-semibold text-gray-800">
                      {selectedDevis.numeroDevis}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Date de création
                    </label>
                    <p className="text-lg font-semibold text-gray-800">
                      {selectedDevis.dateCreation}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Montant total
                    </label>
                    <p className="text-lg font-semibold text-gray-800">
                      {parseInt(selectedDevis.montantTotal).toLocaleString('fr-FR')} FCFA
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Statut
                    </label>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatutColor(selectedDevis.statut)}`}>
                      {selectedDevis.statut}
                    </span>
                  </div>
                </div>

                {/* Informations client (exemple) */}
                <div className="border-t pt-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Informations client</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Nom du client
                      </label>
                      <p className="text-gray-800">Client Exemple</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Email
                      </label>
                      <p className="text-gray-800">client@exemple.com</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Téléphone
                      </label>
                      <p className="text-gray-800">+229 XX XX XX XX</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Adresse
                      </label>
                      <p className="text-gray-800">Cotonou, Bénin</p>
                    </div>
                  </div>
                </div>

                {/* Articles/Services (exemple) */}
                <div className="border-t pt-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Articles/Services</h4>
                  <div className="bg-gray-50 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Description</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Qté</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Prix unitaire</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-3 text-sm text-gray-800">Service de développement web</td>
                          <td className="px-4 py-3 text-sm text-gray-800">1</td>
                          <td className="px-4 py-3 text-sm text-gray-800">
                            {parseInt(selectedDevis.montantTotal).toLocaleString('fr-FR')} FCFA
                          </td>
                          <td className="px-4 py-3 text-sm font-semibold text-gray-800">
                            {parseInt(selectedDevis.montantTotal).toLocaleString('fr-FR')} FCFA
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-3 pt-6 border-t">
                  <button
                    onClick={closeDetailsModal}
                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Fermer
                  </button>
                  <button
                    onClick={() => {
                      closeDetailsModal();
                      handleEdit(selectedDevis.numeroDevis);
                    }}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Modifier
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de confirmation de suppression */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Confirmer la suppression
              </h3>
              <p className="text-gray-600 mb-6">
                Êtes-vous sûr de vouloir supprimer le devis <strong>{devisToDelete}</strong> ? 
                Cette action est irréversible.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DevisDashboard;