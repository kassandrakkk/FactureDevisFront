
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import image from '../../assets/image.jpg'; 
import axios from 'axios';

// Interface pour les données du formulaire d'inscription
interface FormData {
  lastName: string;
  firstName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Composant pour le formulaire d'inscription
const Inscription: React.FC = () => {
    const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    lastName: '',
    firstName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

 //  Gestion de la saisie
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  // Gestion de l'envoi
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Préparer les données exactement comme l'API les attend
      const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const apiData = {
  
        lastName: formData.lastName,
        firstName: formData.firstName,
        email: formData.email,
        password: formData.password,
         confirmPassword: formData.confirmPassword,
  };

  console.log('📤 Données envoyées :', apiData);

      const response = await axios.post(
        'https://dcolsay.alwaysdata.net/bic_webservice/employee.php',
        apiData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

console.log('📥 Réponse brute :', response.data);

      // Extraire le JSON de la réponse (qui peut contenir du HTML)
      let jsonData;
      if (typeof response.data === 'string') {
        const jsonMatch = response.data.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          jsonData = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('Format de réponse invalide');
        }
      } else {
        jsonData = response.data;
      }

      console.log('📋 JSON extrait :', jsonData);

      // Vérifier le succès avec toutes les variantes possibles
      const isSuccess = jsonData.status_code === 100 || 
                       jsonData.status_code === '100' ||
                       jsonData.infos?.toLowerCase().includes('modifié') ||
                       jsonData.infos?.toLowerCase().includes('ajouté') ||
                       jsonData.status_message?.toLowerCase().includes('reussite');

                        if (isSuccess) {
        console.log(' SUCCÈS - Redirection vers /configCompte');
        // Forcer la redirection avec un petit délai pour s'assurer que tout est traité
        setTimeout(() => {
          navigate('/Code', { replace: true });
        }, 100);
      } else {
        console.log(' ÉCHEC :', jsonData);
        setError(jsonData.status_message || jsonData.infos || 'Inscription échouée. Veuillez réessayer.');
      }
       } catch (err) {
      console.error('💥 Erreur complète :', err);
      
      if (axios.isAxiosError(err)) {
        if (err.response?.data) {
          // Essayer d'extraire un message d'erreur de la réponse
          let errorMessage = 'Une erreur est survenue.';
          
          if (typeof err.response.data === 'string') {
            const jsonMatch = err.response.data.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              try {
                const errorData = JSON.parse(jsonMatch[0]);
                errorMessage = errorData.status_message || errorData.infos || errorMessage;
              } catch (parseError) {
                errorMessage = 'Erreur de communication avec le serveur.';
              }
            }
          } else if (err.response.data.status_message) {
            errorMessage = err.response.data.status_message;
          }
          
          setError(errorMessage);
        } else if (err.response && err.response.status >= 400) {
          setError(`Erreur serveur (${err.response.status}). Veuillez réessayer.`);
        } else {
          setError('Impossible de contacter le serveur. Vérifiez votre connexion.');
        }
      } else {
        setError('Une erreur inattendue est survenue. Veuillez réessayer.');
      }
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="min-h-screen display flex w-screen flex items-center justify-center bg-gray-200">
      
         <div className=" display flex">
        <div className="w-fullh-full max-h-full w-2/5 ">
          <img src={image} alt="Illustration" className="w-full h-full object-cover rounded-t-lg" />
        </div>
        <div className="p-8 rounded-b-lg shadow-xl w-full w-3/5">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Inscription</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Nom</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Votre nom"
                required
                disabled={isLoading}
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
                placeholder="Votre prénom"
                required
                 disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Numéro de téléphone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Votre numéro de téléphone"
                required
                 disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Votre email"
                required
                 disabled={isLoading}

              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Mot de passe</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Votre mot de passe"
                required
                disabled={isLoading}
                minLength={4}

              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Confirmer le mot de passe</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Confirmez votre mot de passe"
                required
                minLength={4}
                
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
            >
              S'inscrire
            </button>
            <p className="text-center text-gray-600 mt-4">
              Déjà un compte ?{' '}
              <Link to="/connexion" className="text-blue-600 hover:underline">
                Connectez-vous
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Inscription;
