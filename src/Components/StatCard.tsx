import * as React from 'react';

// Interface pour les données statistiques
interface StatCardData {
  title: string;
  value: string;
  icon: string;
}

// Composant pour une carte de statistique
const StatCard: React.FC<StatCardData> = ({ title, value, icon }) => (
  <div className=" bg-sky-50 p-6 rounded-lg shadow-xl border border-gray-200 hover:shadow-2xl transition duration-300">
    <div className="flex items-center justify-between">
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <span className="text-blue-600">{icon}</span>
    </div>
    <p className="text-2xl font-bold text-gray-800 mt-2">{value}</p>
  </div>
);

export default StatCard;
