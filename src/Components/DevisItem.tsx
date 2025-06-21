
import * as React from 'react';

interface DevisItemProps {
  numeroDevis: string;
  dateCreation: string;
  montantTotal: string;
  statut: string;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const DevisItem: React.FC<DevisItemProps> = ({ numeroDevis, dateCreation, montantTotal, statut, onView, onEdit, onDelete }) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow border border-gray-200 mb-2 hover:bg-gray-50">
    <div>
      <h4 className="text-sm font-medium text-gray-700">{numeroDevis}</h4>
      <p className="text-xs text-gray-500">{dateCreation}</p>
    </div>
    <div className="text-right">
      <p className="text-sm font-semibold text-gray-800">{montantTotal} FCFA</p>
      <span className={`text-xs px-2 py-1 rounded-full ${statut === 'Signé' ? 'bg-green-100 text-green-800' : statut === 'Refusé' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
        {statut}
      </span>
    </div>
    <div className="flex space-x-2">
      <button onClick={onView} className="text-blue-600 hover:text-blue-800 text-xs">Voir</button>
      <button onClick={onEdit} className="text-blue-600 hover:text-blue-800 text-xs">Modifier</button>
      <button onClick={onDelete} className="text-red-600 hover:text-red-800 text-xs">Supprimer</button>
    </div>
  </div>
);

export default DevisItem;
