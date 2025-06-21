
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

interface DevisFormData {
  numeroDevis: string;
  clientId: string;
  entrepriseId: string;
  userId: string;
  dateCreation: string;
  dateExpiration: string;
  statut: string;
  montantTotal: string;
  estSigne: boolean;
  dateSignature?: string;
  signatureUrl?: string;
}

interface LigneDevis {
  articleId: string;
  quantite: string;
  prixUnitaire: string;
}

const AddDevis: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState<DevisFormData>({
    numeroDevis: 'DEV-001',
    clientId: '',
    entrepriseId: '',
    userId: '',
    dateCreation: new Date().toISOString().split('T')[0],
    dateExpiration: '',
    statut: 'Provisoire',
    montantTotal: '0',
    estSigne: false,
    dateSignature: '',
    signatureUrl: '',
  });

  const [ligneDevis, setLigneDevis] = React.useState<LigneDevis[]>([{ articleId: '', quantite: '1', prixUnitaire: '' }]);

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
    const newLignes = [...ligneDevis];
    newLignes[index] = { ...newLignes[index], [name]: value };
    setLigneDevis(newLignes);
    // Recalcule le montant total
    const total = newLignes.reduce((sum, ligne) => {
      const prix = parseFloat(ligne.prixUnitaire) || 0;
      const qty = parseInt(ligne.quantite) || 0;
      return sum + (prix * qty);
    }, 0);
    setFormData((prev) => ({ ...prev, montantTotal: total.toFixed(2) }));
  };

  const addLigne = () => {
    setLigneDevis([...ligneDevis, { articleId: '', quantite: '1', prixUnitaire: '' }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Devis soumis:', { formData, ligneDevis });
    navigate('/ListeDevis');
  };

  const handleExport = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const exportType = e.target.value;
    if (exportType) {
      console.log(`Exportation en ${exportType} déclenchée pour le devis:`, formData);
    }
  };

  return (
    <div className="flex w-full h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 min-w-0 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
          <h2 className="text-3xl font-bold text-gray-900">Créer un Devis</h2>
          <button
            onClick={() => navigate('/ListeDevis')}
            className="text-gray-600 hover:text-blue-700 flex items-center text-lg transition-colors"
          >
            <span className="mr-2">⬅</span> Retour
          </button>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            <DevisHeader
              numero={formData.numeroDevis}
              type="Devis"
              dateCreation={formData.dateCreation}
              societe="3K&fils"
              activite="Votre activité"
            />
            <ClientInfo clientId={formData.clientId} onChange={handleInputChange} />
            <DevisTable
              lignes={ligneDevis}
              onLigneChange={handleLigneChange}
              addLigne={addLigne}
              montantTotal={formData.montantTotal}
            />
            <TotalSection montantTotal={formData.montantTotal} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormInput
                label="Date de Création *"
                name="dateCreation"
                value={formData.dateCreation}
                onChange={handleInputChange}
                type="date"
                required
                className="w-full"
              />
              <FormInput
                label="Date d'Expiration *"
                name="dateExpiration"
                value={formData.dateExpiration}
                onChange={handleInputChange}
                type="date"
                required
                className="w-full"
              />
              <FormSelect
                label="Statut *"
                name="statut"
                value={formData.statut}
                onChange={handleInputChange}
                options={[
                  { value: 'Provisoire', label: 'Provisoire' },
                  { value: 'Finalisé', label: 'Finalisé' },
                  { value: 'Refusé', label: 'Refusé' },
                  { value: 'Signé', label: 'Signé' },
                ]}
                required
                className="w-full"
              />
              <FormInput
                label="ID Entreprise *"
                name="entrepriseId"
                value={formData.entrepriseId}
                onChange={handleInputChange}
                required
                className="w-full"
              />
              <FormInput
                label="ID Utilisateur *"
                name="userId"
                value={formData.userId}
                onChange={handleInputChange}
                required
                className="w-full"
              />
            </div>
            <PaymentInfo
              dateCreation={formData.dateCreation}
              onChange={handleInputChange}
              estSigne={formData.estSigne}
              dateSignature={formData.dateSignature}
              signatureUrl={formData.signatureUrl}
              onCheckboxChange={handleCheckboxChange}
            />
            <div>
              <FormInput
                label="Note"
                name="note"
                value={formData.userId}
                onChange={handleInputChange}
                required
                className="w-full"
              />
              
            </div>
            <div className="flex justify-end space-x-6">
              <div className="px-6 py-3 bg-green-800 text-black rounded-lg shadow-md hover:bg-green-900 transition-colors">
                <FormSelect
                  label=""
                  name="exportType"
                  value=""
                  onChange={handleExport}
                  options={[
                   
                    { value: 'Exporter en PDF', label: 'Exporter en PDF' },
                    { value: 'Exporter en Excel', label: 'Exporter en Excel' },
                  ]}
                  className="w-full bg-transparent text-white"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-colors"
              >
                Enregistrer le Devis
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddDevis;
