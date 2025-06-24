import React from 'react';
import useDocumentModification from './useDocumentModification';

interface User {
  name: string;
}

const DevisForm: React.FC = () => {
  const user: User = { name: 'Utilisateur Test' };
  const initialDevis = { montant: 100, description: 'Description initiale' };

  const { document, setDocument } = useDocumentModification(initialDevis, 'devis', user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDocument(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h1>Modifier Devis</h1>
      <form>
        <label>
          Montant:
          <input
            type="number"
            name="montant"
            value={document.montant}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={document.description}
            onChange={handleChange}
          />
        </label>
      </form>
    </div>
  );
};

export default DevisForm;
