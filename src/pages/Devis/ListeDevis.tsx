
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

  const devisList: Devis[] = [
    { numeroDevis: 'DEV-001', dateCreation: '09 juin 2025', montantTotal: '30000', statut: 'Brouillon' },
    { numeroDevis: 'DEV-002', dateCreation: '08 juin 2025', montantTotal: '80000', statut: 'Validé' },
    { numeroDevis: 'DEV-003', dateCreation: '07 juin 2025', montantTotal: '55800', statut: 'Refusé' },
  ];

  const filteredDevis = devisList
    .filter((devis) =>
      devis.numeroDevis.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatut === 'Tous' || devis.statut === filterStatut)
    )
    .sort((a, b) => (sortBy === 'dateCreation' ? new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime() : 0));

  const handleView = (numeroDevis: string) => {
    console.log(`Voir devis ${numeroDevis}`);
    //pour voir les détails
  };

  const handleEdit = (numeroDevis: string) => {
    console.log(`Modifier devis ${numeroDevis}`);
    //pour éditer
  };

  const handleDelete = (numeroDevis: string) => {
    console.log(`Supprimer devis ${numeroDevis}`);
    //pour supprimer
  };

  return (
    <div className="flex w-full h-screen  bg-gray-200">
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
                onDelete={() => handleDelete(devis.numeroDevis)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DevisDashboard;
