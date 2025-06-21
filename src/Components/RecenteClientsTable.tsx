
import * as React from 'react';


interface Client {
   id: number;
  nom: string;
  prenom: string;
  mail: string;
}


// Composant pour le tableau des utilisateurs récents
const RecentClientsTable: React.FC<{ clients: Client[] }> = ({ clients }) => (
  <div className="bg-white p-6 rounded-lg shadow-xl">
    <h3 className="text-xl font-bold text-gray-800 mb-4">Client </h3>
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-gray-600 font-medium">N°</th>
            <th className="p-3 text-gray-600 font-medium">Nom</th>
            <th className="p-3 text-gray-600 font-medium">Prenom</th>
            <th className="p-3 text-gray-600 font-medium">Email</th>
            
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id} className="border-t">
              <td className="p-3">{client.id}</td>
              <td className="p-3">{client.nom}</td>
              <td className="p-3">{client.prenom}</td>
              <td className="p-3">{client.mail}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default RecentClientsTable;