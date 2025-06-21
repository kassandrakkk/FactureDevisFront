
import * as React from 'react';

interface TotalSectionProps {
  montantTotal: string;
}

const TotalSection: React.FC<TotalSectionProps> = ({ montantTotal }) => (
  <div className="bg-gray-100 p-4 rounded-lg">
    <div className="flex justify-between mb-2">
      <span>Sous-total</span>
      <span>{montantTotal} FCFA</span>
    </div>
    <div className="flex justify-between mb-2">
      <span>TVA (20%)</span>
      <span>{(parseFloat(montantTotal) * 0.2).toFixed(2)} FCFA</span>
    </div>
    <div className="flex justify-between font-bold text-lg">
      <span>Total</span>
      <span>{(parseFloat(montantTotal) * 1.2).toFixed(2)} FCFA</span>
    </div>
  </div>
);

export default TotalSection;
