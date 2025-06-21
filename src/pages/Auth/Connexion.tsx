import * as React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';



interface RegisterFormData {
 
  email: string;
  password: string;
 
}


const Inscription: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    
    email: '',
    password: '',
   
  });
  const [errors, setErrors] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors(null);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Échec de la connexion");
      }

      // Stockage du token si votre API en retourne un
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }

      
      navigate('../pages/DashboardAdmin.tsx');
      
    } catch (error) {
      console.error("Erreur de connexion:", error);
      setErrors(error instanceof Error ? error.message : "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen  w-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition duration-300 hover:scale-105">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Connexion</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          
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
            />
          </div>

          <Link to="/MDPOublié" className="flex items-center hover:text-blue-600">
              <span className="mr-2"></span> Mot de passe oublié
            </Link>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Se connecter
          </button>
         
        </form>
      </div>
    </div>
  );
};

export default Inscription;