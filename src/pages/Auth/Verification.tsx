
import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const EmailVerification: React.FC = () => {
  const [code, setCode] = useState<string>('');

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Limiter à 4 chiffres
    if (/^\d{0,4}$/.test(value)) {
      setCode(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 5) {
      alert('Veuillez entrer un code à 5 chiffres.');
      return;
    }
    // pour vérifier le code (API)
    console.log('Code soumis:', code);
  };

  const handleResendCode = () => {
    //pour renvoyer le code (API à )
    console.log('Renvoyer le code à l\'email');
  };

  return (
    <div className="min-h-screen  w-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Vérification de l'email</h2>
        <p className="text-gray-600 mb-4 text-center">
          Nous allons envoyer un email à{' '}
          <span className="font-semibold text-blue-600">kassandrakakanakou@gmail.com</span> avec un code à 5 chiffres.
          Vous serez ensuite invité à entrer le code à 5 chiffres sur l'écran suivant.
        </p>
        <p className="text-gray-600 mb-6 text-center">
          Si votre adresse email est correcte, cliquez sur « Envoyer le Code » pour envoyer l'email. <br />
          Si votre adresse email est incorrecte, cliquez sur « Modifier l'Adresse Email » pour la mettre à jour.
        </p>
        <div className="flex justify-between gap-4">
          <Link
            to="/inscription"
            className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium text-center hover:bg-gray-300 transition duration-300"
          >
            Changer l'adresse email
          </Link>
          <button
            onClick={handleResendCode}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
          >
          Envoyer le code
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
