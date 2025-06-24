import * as React from 'react';

interface FactureItemProps {
  numeroFacture: string;
  dateCreation: string;
  montantTotal: string;
  statut: string;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const getStatutColor = (statut: string) => {
  switch (statut) {
    case 'Payée':
      return 'text-green-600 bg-green-100';
    case 'Impayée':
      return 'text-red-600 bg-red-100';
    case 'Partiellement payée':
      return 'text-yellow-600 bg-yellow-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

const FactureItem: React.FC<FactureItemProps> = ({
  numeroFacture,
  dateCreation,
  montantTotal,
  statut,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow hover:shadow-md transition duration-300">
      <div className="flex flex-col">
        <span className="text-lg font-semibold text-gray-800">{numeroFacture}</span>
        <span className="text-sm text-gray-600">Créé le : {dateCreation}</span>
      </div>

      <div className="text-sm font-medium text-gray-800">
        {parseInt(montantTotal).toLocaleString('fr-FR')} FCFA
      </div>

      <span className={`text-sm font-semibold px-3 py-1 rounded-full ${getStatutColor(statut)}`}>
        {statut}
      </span>

      <div className="flex space-x-2">
        <button
          onClick={onView}
          className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
        >
          Voir
        </button>
        <button
          onClick={onEdit}
          className="px-3 py-1 text-sm text-yellow-600 border border-yellow-600 rounded hover:bg-yellow-50"
        >
          Modifier
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default FactureItem;
