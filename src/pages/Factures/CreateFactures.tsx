
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar';
import DevisHeader from '../../Components/DevisHeader';
import PaymentInfo from '../../Components/PayementInfo';
import TotalSection from '../../Components/TotalSection';
import DevisTable from '../../Components/DevisTable';
import ClientInfo from '../../Components/ClientInfo';
import FormInput from '../../Components/FormInput';
import FormSelect from '../../Components/FormSelect';

interface FactureFormData {
  numeroFacture: string;
  clientId: string;
  entrepriseId: string;
  userId: string;
  dateCreation: string;
  dateExpiration: string;
  statut: string;
  montantTotal: string;
  estPaye: boolean;
  datePaiement?: string;
  paiementUrl?: string;
}

interface LigneFacture {
  articleId: string;
  quantite: string;
  prixUnitaire: string;
}

const AddFacture: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState<FactureFormData>({
    numeroFacture: 'FAC-001',
    clientId: '',
    entrepriseId: '',
    userId: '',
    dateCreation: new Date().toISOString().split('T')[0],
    dateExpiration: '',
    statut: 'En attente',
    montantTotal: '0',
    estPaye: false,
    datePaiement: '',
    paiementUrl: '',
  });

  const [ligneFacture, setLigneFacture] = React.useState<LigneFacture[]>([{ articleId: '', quantite: '1', prixUnitaire: '' }]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleLigneChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newLignes = [...ligneFacture];
    newLignes[index] = { ...newLignes[index], [name]: value };
    setLigneFacture(newLignes);
    // Recalculer le montant total
    const total = newLignes.reduce((sum, ligne) => {
      const prix = parseFloat(ligne.prixUnitaire) || 0;
      const qty = parseInt(ligne.quantite) || 0;
      return sum + (prix * qty);
    }, 0);
    setFormData((prev) => ({ ...prev, montantTotal: total.toFixed(2) }));
  };

  const addLigne = () => {
    setLigneFacture([...ligneFacture, { articleId: '', quantite: '1', prixUnitaire: '' }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Facture soumise:', { formData, ligneFacture });
    navigate('/factures');
  };

  const handleExport = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const exportType = e.target.value;
    if (exportType) {
      console.log(`Exportation en ${exportType} déclenchée pour la facture:`, formData);
      // Ajoutez ici la logique d'exportation (par exemple, générer un fichier PDF/Excel)
      // Exemple : window.open(`export.php?type=${exportType}&data=${JSON.stringify(formData)}`);
    }
  };

  return (
    <div className="flex w-full h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 min-w-0 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Créer une Facture</h2>
          <button
            onClick={() => navigate('/ListeFacture')}
            className="text-gray-600 hover:text-blue-600 flex items-center"
          >
            <span className="mr-2">⬅</span> Retour
          </button>
        </header>

        <div className="bg-white rounded-lg shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <DevisHeader
              numero={formData.numeroFacture}
              type="Facture"
              dateCreation={formData.dateCreation}
              societe="3K&fils" // Remplacez par votre nom de société
              activite="Votre activité" // Remplacez par votre activité
            />
            <ClientInfo clientId={formData.clientId} onChange={handleInputChange} />
            <DevisTable
              lignes={ligneFacture}
              onLigneChange={handleLigneChange}
              addLigne={addLigne}
              montantTotal={formData.montantTotal}
            />
            <TotalSection montantTotal={formData.montantTotal} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Date de Création *"
                name="dateCreation"
                value={formData.dateCreation}
                onChange={handleInputChange}
                type="date"
                required
              />
              <FormInput
                label="Date d'Expiration *"
                name="dateExpiration"
                value={formData.dateExpiration}
                onChange={handleInputChange}
                type="date"
                required
              />
              <FormSelect
                label="Statut *"
                name="statut"
                value={formData.statut}
                onChange={handleInputChange}
                options={[
                  { value: 'En attente', label: 'En attente' },
                  { value: 'Payée', label: 'Payée' },
                  { value: 'Annulée', label: 'Annulée' },
                ]}
                required
              />

            </div>
            <PaymentInfo
              dateCreation={formData.dateCreation}
              onChange={handleInputChange}
              estSigne={formData.estPaye}
              dateSignature={formData.datePaiement}
              signatureUrl={formData.paiementUrl}
              onCheckboxChange={handleCheckboxChange}
            />
            <div className="flex justify-end space-x-4">
              <div className="px-4 py-2 bg-green-600 text-black rounded-md hover:bg-green-700">
                <FormSelect
                  label=""
                  name="exportType"
                  value=""
                  onChange={handleExport}
                  options={[
                    { value: 'Exporter en PDF', label: 'Exporter en PDF' },
                    { value: 'Exporter en Excel', label: 'Exporter en Excel' },
                  ]}
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Enregistrer la Facture
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddFacture;

