import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar';
import FilterSection from '../../Components/FiltreSection';
import FormInput from '../../Components/FormInput';
import FormSelect from '../../Components/FormSelect';
import FormCheckbox from '../../Components/FormChekbox';
import DevisItem from '../../Components/DevisItem';

interface Facture {
  numeroFacture: string;
  dateCreation: string;
  montantTotal: string;
  statut: string;
}

const FacturesDashboard: React.FC = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortBy, setSortBy] = React.useState('dateCreation');
  const [filterStatut, setFilterStatut] = React.useState('Tous');
  const [facturesList, setFacturesList] = React.useState<Facture[]>([
    { numeroFacture: 'FAC-001', dateCreation: '12 juin 2025', montantTotal: '60000', statut: 'Brouillon' },
    { numeroFacture: 'FAC-002', dateCreation: '10 juin 2025', montantTotal: '150000', statut: 'Payé' },
    { numeroFacture: 'FAC-003', dateCreation: '08 juin 2025', montantTotal: '98000', statut: 'Impayé' },
  ]);

  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [factureToDelete, setFactureToDelete] = React.useState<string | null>(null);
  const [showDetailsModal, setShowDetailsModal] = React.useState(false);
  const [selectedFacture, setSelectedFacture] = React.useState<Facture | null>(null);

  const filteredFactures = facturesList
    .filter((facture) =>
      facture.numeroFacture.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatut === 'Tous' || facture.statut === filterStatut)
    )
    .sort((a, b) =>
      sortBy === 'dateCreation'
        ? new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime()
        : 0
    );

  const handleView = (numeroFacture: string) => {
    const facture = facturesList.find(f => f.numeroFacture === numeroFacture);
    if (facture) {
      setSelectedFacture(facture);
      setShowDetailsModal(true);
    }
  };

  const handleEdit = (numeroFacture: string) => {
    navigate(`/Updatefactures/${numeroFacture}/edit`);
  };

  const handleDeleteClick = (numeroFacture: string) => {
    setFactureToDelete(numeroFacture);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (factureToDelete) {
      setFacturesList(prevList =>
        prevList.filter(facture => facture.numeroFacture !== factureToDelete)
      );
      setFactureToDelete(null);
      setShowDeleteModal(false);
      console.log(`Facture ${factureToDelete} supprimée avec succès`);
    }
  };

  const cancelDelete = () => {
    setFactureToDelete(null);
    setShowDeleteModal(false);
  };

  const closeDetailsModal = () => {
    setSelectedFacture(null);
    setShowDetailsModal(false);
  };

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'Payé': return 'text-green-600 bg-green-100';
      case 'Brouillon': return 'text-yellow-600 bg-yellow-100';
      case 'Impayé': return 'text-red-600 bg-red-100';
      
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="flex w-full h-screen bg-gray-200">
      <Sidebar />
      <main className="flex-1 min-w-0 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Liste des factures</h1>
          <h2 className="text-2xl font-bold text-gray-800">Total: ({filteredFactures.length})</h2>
          <button
            onClick={() => navigate('/CreateFactures')}
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
              { value: 'Brouillon', label: 'Brouillons' },
              { value: 'Payé', label: 'Payé' },
              { value: 'Impayé', label: 'Impayé' },
            
            ]}
          />

          <div className="space-y-4">
            {filteredFactures.map((facture) => (
              <DevisItem
                key={facture.numeroFacture}
                numeroDevis={facture.numeroFacture}
                dateCreation={facture.dateCreation}
                montantTotal={facture.montantTotal}
                statut={facture.statut}
                onView={() => handleView(facture.numeroFacture)}
                onEdit={() => handleEdit(facture.numeroFacture)}
                onDelete={() => handleDeleteClick(facture.numeroFacture)}
              />
            ))}
          </div>
        </div>

        {/* Modal de détails */}
        {showDetailsModal && selectedFacture && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  Détails de la facture
                </h3>
                <button
                  onClick={closeDetailsModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Numéro de facture
                    </label>
                    <p className="text-lg font-semibold text-gray-800">
                      {selectedFacture.numeroFacture}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Date de création
                    </label>
                    <p className="text-lg font-semibold text-gray-800">
                      {selectedFacture.dateCreation}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Montant total
                    </label>
                    <p className="text-lg font-semibold text-gray-800">
                      {parseInt(selectedFacture.montantTotal).toLocaleString('fr-FR')} FCFA
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Statut
                    </label>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatutColor(selectedFacture.statut)}`}>
                      {selectedFacture.statut}
                    </span>
                  </div>
                </div>

                {/* Exemple infos client */}
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
                      <p className="text-gray-800">kassandrakakanakou.com</p>
                    </div>
                  </div>
                </div>

                {/* Exemple article/service */}
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
                          <td className="px-4 py-3 text-sm text-gray-800">Service de comptabilité</td>
                          <td className="px-4 py-3 text-sm text-gray-800">1</td>
                          <td className="px-4 py-3 text-sm text-gray-800">
                            {parseInt(selectedFacture.montantTotal).toLocaleString('fr-FR')} FCFA
                          </td>
                          <td className="px-4 py-3 text-sm font-semibold text-gray-800">
                            {parseInt(selectedFacture.montantTotal).toLocaleString('fr-FR')} FCFA
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
                      handleEdit(selectedFacture.numeroFacture);
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

        {/* Modal suppression */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Confirmer la suppression
              </h3>
              <p className="text-gray-600 mb-6">
                Êtes-vous sûr de vouloir supprimer la facture <strong>{factureToDelete}</strong> ? 
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

export default FacturesDashboard;
