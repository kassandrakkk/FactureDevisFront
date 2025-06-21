
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

const EditDevis: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = React.useState<DevisFormData | null>(null);
  const [initialFormData, setInitialFormData] = React.useState<DevisFormData | null>(null);
  const [ligneDevis, setLigneDevis] = React.useState<LigneDevis[]>([]);

  // Simule un devis  (a remplacer  une API plus tard)
  const sampleDevis = {
    '1': {
      numeroDevis: 'DEV-001',
      clientId: 'CLI-001',
      entrepriseId: 'ENT-001',
      userId: 'USR-001',
      dateCreation: '2025-06-01',
      dateExpiration: '2025-06-30',
      statut: 'Provisoire',
      montantTotal: '25.00',
      estSigne: false,
      dateSignature: '',
      signatureUrl: '',
    },
    // Ajoutez d'autres devis si nécessaire
  };

  const sampleLignes = {
    '1': [
      { articleId: 'Chips', quantite: '2', prixUnitaire: '10.00' },
      { articleId: 'Orange', quantite: '1', prixUnitaire: '5.00' },
    ],
  };

  React.useEffect(() => {
    const foundDevis = sampleDevis[id || '1'];
    const foundLignes = sampleLignes[id || '1'] || [];
    if (foundDevis) {
      setFormData({ ...foundDevis });
      setInitialFormData({ ...foundDevis });
      setLigneDevis([...foundLignes]);
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (formData) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      const { name, checked } = e.target;
      setFormData({ ...formData, [name]: checked });
    }
  };

  const handleLigneChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newLignes = [...ligneDevis];
    newLignes[index] = { ...newLignes[index], [name]: value };
    setLigneDevis(newLignes);
    // Recalculer le montant total
    const total = newLignes.reduce((sum, ligne) => {
      const prix = parseFloat(ligne.prixUnitaire) || 0;
      const qty = parseInt(ligne.quantite) || 0;
      return sum + (prix * qty);
    }, 0);
    if (formData) setFormData({ ...formData, montantTotal: total.toFixed(2) });
  };

  const addLigne = () => {
    setLigneDevis([...ligneDevis, { articleId: '', quantite: '1', prixUnitaire: '' }]);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData && initialFormData) {
      // Simuler la sauvegarde (remplacez par une API)
      console.log('Devis mis à jour:', { formData, ligneDevis });
      navigate('/devis'); // Rediriger vers la liste des devis
    }
  };

  const handleCancel = () => {
    navigate('/devis'); // Rediriger vers la liste des devis
  };

  if (!formData) return <div>Devis non trouvé</div>;

  return (
    <div className="flex w-full h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 min-w-0 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Modifier un Devis</h2>
          <button
            onClick={() => navigate('/devis')}
            className="text-gray-600 hover:text-blue-600 flex items-center"
          >
            <span className="mr-2">⬅</span> Retour
          </button>
        </header>

        <div className="bg-white rounded-lg shadow-xl">
          <form onSubmit={handleSave} className="space-y-6">
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
                  { value: 'Provisoire', label: 'Provisoire' },
                  { value: 'Finalisé', label: 'Finalisé' },
                  { value: 'Refusé', label: 'Refusé' },
                  { value: 'Signé', label: 'Signé' },
                ]}
                required
              />
              <FormInput
                label="ID Entreprise *"
                name="entrepriseId"
                value={formData.entrepriseId}
                onChange={handleInputChange}
                required
              />
              <FormInput
                label="ID Utilisateur *"
                name="userId"
                value={formData.userId}
                onChange={handleInputChange}
                required
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
            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Sauvegarder
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
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

export default EditDevis;
