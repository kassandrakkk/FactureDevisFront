import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar';
import FormInput from '../../Components/FormInput';

interface Client {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  ville: string;
  pays: string;
  code_postal: string;
  telephone: string;
  dateCreation: string;
}

interface ValidationErrors {
  nom?: string;
  prenom?: string;
  email?: string;
  telephone?: string;
  ville?: string;
  pays?: string;
  code_postal?: string;
}

const AddClient: React.FC = () => {
  const navigate = useNavigate();
  const [client, setClient] = React.useState<Client>({
    id: crypto.randomUUID(),
    nom: '',
    prenom: '',
    email: '',
    ville: '',
    pays: '',
    code_postal: '',
    telephone: '',
    dateCreation: new Date().toISOString().split('T')[0], // Date actuelle
  });

  const [errors, setErrors] = React.useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
    
    // Effacer l'erreur pour ce champ lors de la saisie
    if (errors[name as keyof ValidationErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Validation du nom
    if (!client.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    } else if (client.nom.trim().length < 2) {
      newErrors.nom = 'Le nom doit contenir au moins 2 caractères';
    }

    // Validation du prénom
    if (!client.prenom.trim()) {
      newErrors.prenom = 'Le prénom est requis';
    } else if (client.prenom.trim().length < 2) {
      newErrors.prenom = 'Le prénom doit contenir au moins 2 caractères';
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!client.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!emailRegex.test(client.email)) {
      newErrors.email = 'Veuillez saisir un email valide';
    }

    // Validation du téléphone
    const phoneRegex = /^(\+33|0)[1-9](\d{8})$/;
    if (!client.telephone.trim()) {
      newErrors.telephone = 'Le téléphone est requis';
    } else if (!phoneRegex.test(client.telephone.replace(/\s/g, ''))) {
      newErrors.telephone = 'Veuillez saisir un numéro de téléphone français valide';
    }

    // Validation de la ville
    if (!client.ville.trim()) {
      newErrors.ville = 'La ville est requise';
    } else if (client.ville.trim().length < 2) {
      newErrors.ville = 'La ville doit contenir au moins 2 caractères';
    }

    // Validation du pays
    if (!client.pays.trim()) {
      newErrors.pays = 'Le pays est requis';
    } else if (client.pays.trim().length < 2) {
      newErrors.pays = 'Le pays doit contenir au moins 2 caractères';
    }

    // Validation du code postal
    const postalRegex = /^\d{5}$/;
    if (!client.code_postal.trim()) {
      newErrors.code_postal = 'Le code postal est requis';
    } else if (!postalRegex.test(client.code_postal)) {
      newErrors.code_postal = 'Le code postal doit contenir 5 chiffres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkEmailExists = (email: string): boolean => {
    const existingClients = JSON.parse(localStorage.getItem('clients') || '[]');
    return existingClients.some((c: Client) => c.email.toLowerCase() === email.toLowerCase());
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Vérifier si l'email existe déjà
    if (checkEmailExists(client.email)) {
      setErrors({ email: 'Cet email est déjà utilisé par un autre client' });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simuler un délai d'API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Récupérer les clients existants
      const existingClients = JSON.parse(localStorage.getItem('clients') || '[]');
      
      // Nettoyer les données du client
      const cleanedClient = {
        ...client,
        nom: client.nom.trim(),
        prenom: client.prenom.trim(),
        email: client.email.trim().toLowerCase(),
        ville: client.ville.trim(),
        pays: client.pays.trim(),
        code_postal: client.code_postal.trim(),
        telephone: client.telephone.trim(),
      };

      // Ajouter le nouveau client
      const updatedClients = [...existingClients, cleanedClient];
      localStorage.setItem('clients', JSON.stringify(updatedClients));

      // Afficher le message de succès
      setShowSuccessMessage(true);

      // Rediriger après 2 secondes
      
        setTimeout(() => {
          navigate('/AllClient', {
            state: {
              successMessage: `Client ${cleanedClient.prenom} ${cleanedClient.nom} ajouté avec succès !`
            }
          });
        }, 2000);

    } catch (error) {
      console.error('Erreur lors de l\'ajout du client:', error);
      setErrors({ nom: 'Une erreur est survenue lors de l\'ajout du client' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/client-list');
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="flex w-full h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 min-w-0 p-8 overflow-y-auto">
        {/* En-tête */}
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 border-b border-gray-200 pb-6">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Ajouter un Client</h1>
            <p className="text-gray-600">Saisissez les informations du nouveau client</p>
          </div>
          <button
            onClick={handleCancel}
            className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour à la liste
          </button>
        </header>

        {/* Message de succès */}
        {showSuccessMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-sm font-medium text-green-800">
                Client ajouté avec succès ! Redirection en cours...
              </p>
            </div>
          </div>
        )}

        {/* Formulaire */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h2 className="text-xl font-semibold text-gray-900">Informations du client</h2>
            <p className="text-sm text-gray-600 mt-1">Tous les champs marqués d'un astérisque (*) sont obligatoires</p>
          </div>

          <form onSubmit={handleSave} className="p-6">
            {/* Messages d'erreur globaux */}
            {hasErrors && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm font-medium text-red-800">
                    Veuillez corriger les erreurs ci-dessous avant de continuer.
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-6">
              {/* Section Identité */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Identité
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <FormInput
                      label="Nom *"
                      name="nom"
                      value={client.nom}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                      placeholder="Dupont"
                    />
                    {errors.nom && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.nom}
                      </p>
                    )}
                  </div>
                  <div>
                    <FormInput
                      label="Prénom *"
                      name="prenom"
                      value={client.prenom}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                      placeholder="Jean"
                    />
                    {errors.prenom && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.prenom}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section Contact */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <FormInput
                      label="Email *"
                      name="email"
                      value={client.email}
                      onChange={handleInputChange}
                      type="email"
                      required
                      className="w-full"
                      placeholder="jean.dupont@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <FormInput
                      label="Téléphone *"
                      name="telephone"
                      value={client.telephone}
                      onChange={handleInputChange}
                      type="tel"
                      required
                      className="w-full"
                      placeholder="+33 1 23 45 67 89"
                    />
                    {errors.telephone && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.telephone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section Adresse */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Adresse
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <FormInput
                      label="Ville *"
                      name="ville"
                      value={client.ville}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                      placeholder="Paris"
                    />
                    {errors.ville && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.ville}
                      </p>
                    )}
                  </div>
                  <div>
                    <FormInput
                      label="Pays *"
                      name="pays"
                      value={client.pays}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                      placeholder="France"
                    />
                    {errors.pays && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.pays}
                      </p>
                    )}
                  </div>
                  <div>
                    <FormInput
                      label="Code Postal *"
                      name="code_postal"
                      value={client.code_postal}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                      placeholder="75001"
                      maxLength={5}
                    />
                    {errors.code_postal && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.code_postal}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting || showSuccessMessage}
                className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Ajout en cours...
                  </>
                ) : showSuccessMessage ? (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Client ajouté !
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Ajouter le client
                  </>
                )}
              </button>
            </div>

            {/* Note d'information */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-400 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-blue-800">Information</p>
                  <p className="text-sm text-blue-700 mt-1">
                    Une fois le client ajouté, vous serez automatiquement redirigé vers la liste des clients 
                    où vous pourrez voir votre nouveau client et gérer ses informations.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddClient;