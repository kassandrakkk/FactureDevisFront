
import * as React from 'react';
import FormInput from './FormInput';
import FormSelect from './FormSelect';

interface LigneDevis {
  articleId: string;
  quantite: string;
  prixUnitaire: string;
}

interface DevisTableProps {
  lignes: LigneDevis[];
  onLigneChange: (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  addLigne: () => void;
  montantTotal: string; 
}

const DevisTable: React.FC<DevisTableProps> = ({ lignes, onLigneChange, addLigne, montantTotal }) => (
  <div className="overflow-x-auto">
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-200 text-gray-800">
          <th className="p-2 border border-gray-300 text-left">Description</th>
          <th className="p-2 border border-gray-300 text-right">Quantité</th>
          <th className="p-2 border border-gray-300 text-right">Prix Unitaire</th>
          <th className="p-2 border border-gray-300 text-right">Montant</th>
        </tr>
      </thead>
      <tbody>
        {lignes.map((ligne, index) => (
          <tr key={index} className="border-b border-gray-300">
            <td className="p-2">
              <FormSelect
                label=""
                name="articleId"
                value={ligne.articleId}
                onChange={(e) => onLigneChange(index, e)}
                options={[
                  { value: 'Chips', label: 'Chips' },
                  { value: 'Aklui', label: 'Aklui' },
                  { value: 'Poisson Séché', label: 'Poisson Séché' },
                  { value: 'Jus', label: 'Jus' },
                  { value: 'Légume Sécher', label: 'Légume Sécher' },
                  { value: 'Orange', label: 'Orange' },
                  { value: 'Pain', label: 'Pain' },
                ]}
                required
              />
            </td>
            <td className="p-2 text-right">
              <FormInput
                label=""
                name="quantite"
                value={ligne.quantite}
                onChange={(e) => onLigneChange(index, e)}
                type="number"
                required
              />
            </td>
            <td className="p-2 text-right">
              <FormInput
                label=""
                name="prixUnitaire"
                value={ligne.prixUnitaire}
                onChange={(e) => onLigneChange(index, e)}
                required
              />
            </td>
            <td className="p-2 text-right">
              {((parseFloat(ligne.prixUnitaire) || 0) * (parseInt(ligne.quantite) || 0)).toFixed(2)} FCFA
            </td>
          </tr>
        ))}
        {/* Ligne pour le total */}
        <tr className="bg-gray-100 font-bold">
          <td colSpan={4} className="p-2 text-right">TOTAL HT</td>
          <td className="p-2 text-right">{montantTotal} FCFA</td>
        </tr>
        <tr className="bg-gray-100 font-bold">
          <td colSpan={4} className="p-2 text-right">TVA 18%</td>
          <td className="p-2 text-right">{(parseFloat(montantTotal) * 0.18).toFixed(2)} FCFA</td>
        </tr>
        <tr className="bg-gray-100 font-bold">
          <td colSpan={4} className="p-2 text-right">TOTAL TTC</td>
          <td className="p-2 text-right">{(parseFloat(montantTotal) * 1.2).toFixed(2)} FCFA</td>
        </tr>
      </tbody>
    </table>
    <button
      type="button"
      onClick={addLigne}
      className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    >
      Ajouter une ligne
    </button>
  </div>
);

export default DevisTable;