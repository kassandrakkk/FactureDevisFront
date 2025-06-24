
import React, { useState } from 'react';

// Interface pour les données du formulaire
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

// Composant pour la modification des informations de l'entreprise
const Parametre: React.FC = () => {
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

  // Gérer les changements dans les champs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Gérer la soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Données modifiées :', formData);
    // Ajoutez ici votre logique pour sauvegarder les modifications (ex. appel API)
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition duration-300 hover:scale-105">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Modifier les informations de l'organisation</h2>
        <p>Modifiez les informations ci-dessous pour mettre à jour les détails de votre organisation.</p>
        <p>Ces informations sont utilisées pour la génération des devis et factures.</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Adresse mail</label>
            <input
              type="email"
              name="emailPro"
              value={formData.emailPro}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Adresse email professionnelle (requis)"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Nom</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Votre nom (requis)"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Prénom</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Votre prénom (requis)"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Nom de votre organisation</label>
            <input
              type="text"
              name="OrgName"
              value={formData.OrgName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Nom de votre organisation (requis)"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Forme Juridique</label>
            <input
              type="text"
              name="FormeJuridique"
              value={formData.FormeJuridique}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Forme juridique (requis)"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Adresse</label>
            <input
              type="text"
              name="Adresse"
              value={formData.Adresse}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Adresse (requis)"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Ville</label>
            <input
              type="text"
              name="Ville"
              value={formData.Ville}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Ville (requis)"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Pays</label>
            <input
              type="text"
              name="Pays"
              value={formData.Pays}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Pays (requis)"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">Téléphone</label>
            <input
              type="tel"
              name="Tel"
              value={formData.Tel}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Téléphone"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Sauvegarder les modifications
          </button>
        </form>
      </div>
    </div>
  );
};

export default Parametre;
