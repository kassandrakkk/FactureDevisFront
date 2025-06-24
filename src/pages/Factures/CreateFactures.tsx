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
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
    numeroFacture: `FAC-${Date.now().toString().slice(-6)}`,
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

  const [ligneFacture, setLigneFacture] = React.useState<LigneFacture[]>([
    { articleId: '', quantite: '1', prixUnitaire: '' },
  ]);

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

    const total = newLignes.reduce((sum, ligne) => {
      const prix = parseFloat(ligne.prixUnitaire) || 0;
      const qty = parseInt(ligne.quantite) || 0;
      return sum + prix * qty;
    }, 0);
    setFormData((prev) => ({ ...prev, montantTotal: total.toFixed(2) }));
  };

  const addLigne = () => {
    setLigneFacture([...ligneFacture, { articleId: '', quantite: '1', prixUnitaire: '' }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Facture soumise:', { formData, ligneFacture });
    navigate('/ListeFactures');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Facture', 14, 22);
    doc.setFontSize(12);
    doc.text(`Numéro: ${formData.numeroFacture}`, 14, 32);
    doc.text(`Date: ${formData.dateCreation}`, 14, 38);
    doc.text(`Client: ${formData.clientId}`, 14, 44);
    doc.text(`Statut: ${formData.statut}`, 14, 50);
    
    const tableData = ligneFacture.map((ligne, index) => [
      index + 1,
      ligne.articleId,
      ligne.quantite,
      ligne.prixUnitaire,
      (parseFloat(ligne.prixUnitaire) * parseInt(ligne.quantite)).toFixed(2),
    ]);

    autoTable(doc, {
      startY: 60,
      head: [['#', 'Article', 'Quantité', 'Prix Unitaire', 'Total']],
      body: tableData,
    });

    doc.setFontSize(14);
    doc.text(`Montant TOTAL (TTC): ${formData.montantTotal} FCFA`, 14, doc.lastAutoTable.finalY + 10);
    doc.save(`${formData.numeroFacture}.pdf`);
  };

  const exportToExcel = () => {
    const csvContent = `Numero Facture,Client ID,Date Creation,Date Expiration,Montant Total,Statut\n${formData.numeroFacture},${formData.clientId},${formData.dateCreation},${formData.dateExpiration},${formData.montantTotal},${formData.statut}`;
    const file = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = `${formData.numeroFacture}.csv`;
    link.click();
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
          <form onSubmit={handleSubmit} className="space-y-6 p-6">
            <DevisHeader
              numero={formData.numeroFacture}
              type="Facture"
              dateCreation={formData.dateCreation}
              societe="3K&fils"
              activite="Votre activité"
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
                label="Date de Création"
                name="dateCreation"
                value={formData.dateCreation}
                onChange={handleInputChange}
                type="date"
                required
              />
              <FormInput
                label="Date d'Echeance"
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

            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={exportToPDF}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
              >
                📄 Exporter en PDF
              </button>
              <button
                type="button"
                onClick={exportToExcel}
                className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
              >
                📊 Exporter en Excel
              </button>
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