import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Interface pour les données du formulaire d'inscription
interface RegisterFormData {
  emailPro: string;
  lastName: string;
  firstName: string;
  OrgName: string;
  FormeJuridique: string;
   Adresse: string;
    Ville: string;
    Pays: string;
     Tel: string;
  
}

// Composant pour le formulaire d'inscription
const Inscription: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    emailPro: '',
    lastName: '',
    firstName: '',
     OrgName: '',
    FormeJuridique: '',
       Adresse: '',
       Ville: '',
        Pays: '',
         Tel: '',
   
  });

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition duration-300 hover:scale-105">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Creation de votre organisation</h2>
        <p>Les informations ci-dessous seront nécessairees pour la génération des devis et factures.</p>
        <p>Vous pourrez les modifier à tout moment via Paramètre</p>
        <form  className="space-y-6">

            <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Adresse mail</label>
            <input
              type="text"
              name="firstName"
              value={formData.emailPro}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Adresse email professionnelle(requis)"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Nom</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Votre nom(requis)"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Prénom</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Votre prénom(requis)"
              required
            />
          </div>

           <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Nom de votre organisation</label>
            <input
              type="text"
              name="firstName"
              value={formData.OrgName}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Nom de votre organisation(requis)"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Forme Juridique</label>
            <input
              type="text"
              name="firstName"
              value={formData.FormeJuridique}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Forme juridique(requis) "
              required
            />
          </div>
            <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Adresse</label>
            <input
              type="text"
              name="firstName"
              value={formData.Adresse}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Adresse(requis)"
              required
            />
          </div>
           <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Ville</label>
            <input
              type="text"
              name="firstName"
              value={formData.Ville}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="ville(requis)"
              required
            />
          </div>
           <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Pays</label>
            <input
              type="text"
              name="firstName"
              value={formData.Pays}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Pays(requis)"
              required
            />
          </div>
          
         
         
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Enregistrer
          </button>
        
        </form>
      </div>
    </div>
  );
};

export default Inscription;