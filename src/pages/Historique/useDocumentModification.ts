import { useState, useEffect } from 'react';

interface User {
  name: string;
}

interface Historique {
  id: string;
  user_id: number;
  type_operation: string;
  changements: string;
  date_action: string;
  user?: User;
}

interface Document {
  [key: string]: any;
}

const useDocumentModification = (initialDocument: Document, documentType: 'devis' | 'facture', user: User) => {
  const [document, setDocument] = useState<Document>(initialDocument);

  useEffect(() => {
    const ajouterHistorique = (champ: string, nouvelleValeur: any, ancienneValeur: any) => {
      const savedHistoriques = localStorage.getItem('historiques');
      const historiques: Historique[] = savedHistoriques ? JSON.parse(savedHistoriques) : [];

      const nouvelHistorique: Historique = {
        id: Date.now().toString(),
        user_id: 1, // Remplacez par l'ID de l'utilisateur actuel
        type_operation: 'modification',
        changements: JSON.stringify({
          champ_modifie: champ,
          ancienne_valeur: ancienneValeur,
          nouvelle_valeur: nouvelleValeur,
        }),
        date_action: new Date().toISOString(),
        user: user,
      };

      const misAJourHistoriques = [nouvelHistorique, ...historiques];
      localStorage.setItem('historiques', JSON.stringify(misAJourHistoriques));
    };

    const handleChange = (champ: string, valeur: any) => {
      const ancienneValeur = document[champ];
      setDocument(prev => ({ ...prev, [champ]: valeur }));
      ajouterHistorique(champ, valeur, ancienneValeur);
    };

    return { document, handleChange };
  }, [documentType, user]);

  return { document, setDocument };
};

export default useDocumentModification;
