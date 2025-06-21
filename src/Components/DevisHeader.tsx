
import * as React from 'react';

interface DevisHeaderProps {
  numero: string;
  type: 'Devis' | 'Facture';
  dateCreation?: string;
  dateEcheance?: string;
  societe?: string;
  activite?: string;
}

const DevisHeader: React.FC<DevisHeaderProps> = ({
  numero,
  type,
  dateCreation = new Date().toISOString().split('T')[0],
  dateEcheance = '',
  societe = '3K&fils',
  activite = 'Votre activité',
}) => {

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  return (
    <div className="bg-white p-4 flex justify-between items-center border-b border-gray-300">
      <div className="text-gray-600">
        <h3 className="text-lg font-semibold">{societe}</h3>
        <p className="text-sm">{activite}</p>
      </div>
      <div className="bg-gray-200 p-2 border border-gray-300 rounded flex items-center justify-center w-1/3">
        <h3 className="text-xl font-bold uppercase text-gray-800">{type}</h3>
      </div>
      <div className="text-right text-gray-600">
        <p>Date: {formatDate(dateCreation)}</p>
        <p>
          {type === 'Devis' ? 'Devis n°' : 'Facture n°'}: {numero}
        </p>
      </div>
    </div>
  );
};

export default DevisHeader;
