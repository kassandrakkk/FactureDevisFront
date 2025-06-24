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
  note: string;
}

interface LigneDevis {
  articleId: string;
  quantite: string;
  prixUnitaire: string;
  description?: string;
}

const AddDevis: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState<DevisFormData>({
    numeroDevis: `DEV-${Date.now().toString().slice(-6)}`,
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
    note: '',
  });

  const [ligneDevis, setLigneDevis] = React.useState<LigneDevis[]>([
    { articleId: '', quantite: '1', prixUnitaire: '', description: '' }
  ]);

  const [showModal, setShowModal] = React.useState(false);
  const [modalType, setModalType] = React.useState<'success' | 'error' | 'confirm' | null>(null);
  const [modalMessage, setModalMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: checked,
      dateSignature: checked ? new Date().toISOString().split('T')[0] : '',
    }));
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
      return sum + prix * qty;
    }, 0);
    setFormData((prev) => ({ ...prev, montantTotal: total.toFixed(2) }));
  };

  const addLigne = () => {
    setLigneDevis([...ligneDevis, { articleId: '', quantite: '1', prixUnitaire: '', description: '' }]);
  };

  const removeLigne = (index: number) => {
    if (ligneDevis.length > 1) {
      const newLignes = ligneDevis.filter((_, i) => i !== index);
      setLigneDevis(newLignes);
      
      // Recalculer le montant total
      const total = newLignes.reduce((sum, ligne) => {
        const prix = parseFloat(ligne.prixUnitaire) || 0;
        const qty = parseInt(ligne.quantite) || 0;
        return sum + prix * qty;
      }, 0);
      setFormData((prev) => ({ ...prev, montantTotal: total.toFixed(2) }));
    }
  };

  const validateForm = (): boolean => {
    if (!formData.clientId) {
      showMessage('Veuillez sélectionner un client', 'error');
      return false;
    }
    if (!formData.dateExpiration) {
      showMessage('Veuillez définir une date d\'expiration', 'error');
      return false;
    }
    if (ligneDevis.some(ligne => !ligne.prixUnitaire || !ligne.quantite)) {
      showMessage('Veuillez remplir toutes les lignes du devis', 'error');
      return false;
    }
    if (parseFloat(formData.montantTotal) <= 0) {
      showMessage('Le montant total doit être supérieur à 0', 'error');
      return false;
    }
    return true;
  };

  const showMessage = (message: string, type: 'success' | 'error' | 'confirm') => {
    setModalMessage(message);
    setModalType(type);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Logique d'enregistrement
      const devisData = {
        ...formData,
        lignes: ligneDevis,
        dateCreation: new Date().toISOString(),
      };
      
      console.log('Devis créé:', devisData);
      
      // Sauvegarder dans le localStorage pour simulation
      const existingDevis = JSON.parse(localStorage.getItem('devisList') || '[]');
      existingDevis.push(devisData);
      localStorage.setItem('devisList', JSON.stringify(existingDevis));
      
      showMessage('Devis créé avec succès!', 'success');
      
      // Rediriger après 2 secondes
      setTimeout(() => {
        navigate('/ListeDevis');
      }, 2000);
      
    } catch (error) {
      showMessage('Erreur lors de la création du devis', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConvertToInvoice = () => {
    if (formData.statut !== 'Signé') {
      showMessage('Seuls les devis signés peuvent être convertis en facture', 'error');
      return;
    }
    
    if (!validateForm()) return;

    setModalType('confirm');
    setModalMessage('Voulez-vous convertir ce devis en facture ?');
    setShowModal(true);
  };

  const confirmConvertToInvoice = () => {
    // Logique de conversion
    const factureData = {
      ...formData,
      numeroFacture: `FAC-${Date.now().toString().slice(-6)}`,
      type: 'facture',
      lignes: ligneDevis,
    };
    
    console.log('Facture créée:', factureData);
    
    // Sauvegarder la facture
    const existingFactures = JSON.parse(localStorage.getItem('facturesList') || '[]');
    existingFactures.push(factureData);
    localStorage.setItem('facturesList', JSON.stringify(existingFactures));
    
    setShowModal(false);
    showMessage('Devis converti en facture avec succès!', 'success');
    
    setTimeout(() => {
      navigate('/ListeFactures');
    }, 2000);
  };

  const exportToPDF = () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Créer le contenu PDF
      const content = `
DEVIS N° ${formData.numeroDevis}
=====================================

Date de création: ${formData.dateCreation}
Date d'expiration: ${formData.dateExpiration}
Client ID: ${formData.clientId}
Statut: ${formData.statut}

LIGNES DU DEVIS:
${ligneDevis.map((ligne, index) => 
  `${index + 1}. ${ligne.description || ligne.articleId} - Qté: ${ligne.quantite} - Prix: ${ligne.prixUnitaire} FCFA`
).join('\n')}

MONTANT TOTAL: ${formData.montantTotal} FCFA

Notes: ${formData.note}
      `;
      
      const file = new Blob([content], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(file);
      link.download = `Devis_${formData.numeroDevis}.txt`;
      link.click();
      
      showMessage('Devis exporté en PDF avec succès!', 'success');
    } catch (error) {
      showMessage('Erreur lors de l\'export PDF', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const exportToExcel = () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Créer le contenu CSV
      const headers = 'Numero Devis,Client ID,Date Creation,Date Expiration,Montant Total,Statut,Article,Quantite,Prix Unitaire,Sous Total\n';
      const rows = ligneDevis.map(ligne => 
        `${formData.numeroDevis},${formData.clientId},${formData.dateCreation},${formData.dateExpiration},${formData.montantTotal},${formData.statut},${ligne.articleId},${ligne.quantite},${ligne.prixUnitaire},${(parseFloat(ligne.prixUnitaire) * parseInt(ligne.quantite)).toFixed(2)}`
      ).join('\n');
      
      const csvContent = headers + rows;
      const file = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(file);
      link.download = `Devis_${formData.numeroDevis}.csv`;
      link.click();
      
      showMessage('Devis exporté en Excel avec succès!', 'success');
    } catch (error) {
      showMessage('Erreur lors de l\'export Excel', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType(null);
    setModalMessage('');
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
            
            <ClientInfo 
              clientId={formData.clientId} 
              onChange={handleInputChange} 
            />
            
            <DevisTable
              lignes={ligneDevis}
              onLigneChange={handleLigneChange}
              addLigne={addLigne}
              removeLigne={removeLigne}
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
                value={formData.note}
                onChange={handleInputChange}
                className="w-full"
                placeholder="Ajoutez une note pour ce devis..."
              />
            </div>
            
            <div className="flex justify-end space-x-4 flex-wrap">
              <button
                type="button"
                onClick={handleConvertToInvoice}
                disabled={isLoading}
                className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors disabled:opacity-50"
              >
                🧾 Convertir en Facture
              </button>
              <button
                type="button"
                onClick={exportToPDF}
                disabled={isLoading}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors disabled:opacity-50"
              >
                📄 Exporter en PDF
              </button>
              <button
                type="button"
                onClick={exportToExcel}
                disabled={isLoading}
                className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors disabled:opacity-50"
              >
                📊 Exporter en Excel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Enregistrement...' : 'Enregistrer le Devis'}
              </button>
            </div>
          </form>
        </div>

        {/* Modal pour les messages et confirmations */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
              {modalType === 'success' && (
                <>
                  <div className="text-center">
                    <div className="text-green-500 text-6xl mb-4">✅</div>
                    <h2 className="text-xl font-bold mb-4 text-green-600">Succès</h2>
                    <p className="mb-6">{modalMessage}</p>
                  </div>
                  <div className="flex justify-center">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      OK
                    </button>
                  </div>
                </>
              )}

              {modalType === 'error' && (
                <>
                  <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">❌</div>
                    <h2 className="text-xl font-bold mb-4 text-red-600">Erreur</h2>
                    <p className="mb-6">{modalMessage}</p>
                  </div>
                  <div className="flex justify-center">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      OK
                    </button>
                  </div>
                </>
              )}

              {modalType === 'confirm' && (
                <>
                  <h2 className="text-xl font-bold mb-4">Confirmation</h2>
                  <p className="mb-6">{modalMessage}</p>
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={confirmConvertToInvoice}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Confirmer
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Loader overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span>Traitement en cours...</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AddDevis;