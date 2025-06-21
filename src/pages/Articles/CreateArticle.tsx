
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar';
import FormInput from '../../Components/FormInput';

interface Article {
  id: string;
  company_id: string;
  code_article: string;
  designation: string;
  description: string;
  prix_unitaire: string;
  taux_tva: string;
}

const ManageArticles: React.FC = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [newArticle, setNewArticle] = React.useState<Article>({
    id: crypto.randomUUID(),
    company_id: '',
    code_article: '',
    designation: '',
    description: '',
    prix_unitaire: '',
    taux_tva: '20', // Valeur par défaut en pourcentage
  });
  const [editArticle, setEditArticle] = React.useState<Article | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editArticle) {
      setEditArticle({ ...editArticle, [name]: value });
    } else {
      setNewArticle({ ...newArticle, [name]: value });
    }
    // Recalculer prixTTC si prix_unitaire ou taux_tva change
    if ((name === 'prix_unitaire' || name === 'taux_tva') && value) {
      const prixUnitaireNum = parseFloat(editArticle?.prix_unitaire || newArticle.prix_unitaire) || 0;
      const tauxTvaNum = parseFloat(value) || 0; // Taux en pourcentage
      const tva = (prixUnitaireNum * tauxTvaNum) / 100;
      const prixTTCNum = prixUnitaireNum + tva;
      if (editArticle) {
        setEditArticle({ ...editArticle, [name]: value, prixTTC: prixTTCNum.toFixed(2) });
      } else {
        setNewArticle({ ...newArticle, [name]: value, prixTTC: prixTTCNum.toFixed(2) });
      }
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setArticles([...articles, newArticle]);
    setNewArticle({
      id: crypto.randomUUID(),
      company_id: '',
      code_article: '',
      designation: '',
      description: '',
      prix_unitaire: '',
      taux_tva: '20',
    });
  };

  const handleEdit = (article: Article) => {
    setEditArticle(article);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editArticle) {
      setArticles(articles.map((a) => (a.id === editArticle.id ? editArticle : a)));
      setEditArticle(null);
    }
  };

  const handleDelete = (id: string) => {
    setArticles(articles.filter((a) => a.id !== id));
    if (editArticle && editArticle.id === id) setEditArticle(null);
  };

  return (
    <div className="flex w-full h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 min-w-0 p-6 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
          <h2 className="text-3xl font-bold text-gray-900">Gérer les Articles</h2>
          <button
            onClick={() => navigate('/ListeArticles')}
            className="text-gray-600 hover:text-blue-600 flex items-center text-lg transition-colors"
          >
            <span className="mr-2">⬅</span> Retour
          </button>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            {editArticle ? 'Modifier Article' : 'Ajouter un Article'}
          </h3>
          <form onSubmit={editArticle ? handleUpdate : handleCreate} className="space-y-6">
          
           
            <FormInput
              label="Nom de l'article"
              name="designation"
              value={editArticle ? editArticle.designation : newArticle.designation}
              onChange={handleInputChange}
              required
              className="w-full"
            />
            <FormInput
              label="Description"
              name="description"
              value={editArticle ? editArticle.description : newArticle.description}
              onChange={handleInputChange}
              className="w-full"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Prix Unitaire"
                name="prix_unitaire"
                value={editArticle ? editArticle.prix_unitaire : newArticle.prix_unitaire}
                onChange={handleInputChange}
                type="number"
                step="0.01"
                required
                className="w-full"
              />
              <FormInput
                label="Taux TVA (%) *"
                name="taux_tva"
                value={editArticle ? editArticle.taux_tva : newArticle.taux_tva}
                onChange={handleInputChange}
                type="number"
                step="0.01"
                required
                className="w-full"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors shadow-md"
              >
                {editArticle ? 'Mettre à jour' : 'Ajouter'}
              </button>
              {editArticle && (
                <button
                  type="button"
                  onClick={() => setEditArticle(null)}
                  className="px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors shadow-md"
                >
                  Annuler
                </button>
              )}
            </div>
          </form>

          {/* Liste des articles */}
          {articles.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Liste des Articles</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-700 border-collapse">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 border-b">Code Article</th>
                      <th className="px-4 py-2 border-b">Désignation</th>
                      <th className="px-4 py-2 border-b">Description</th>
                      <th className="px-4 py-2 border-b">Prix Unitaire</th>
                      <th className="px-4 py-2 border-b">Taux TVA (%)</th>
                      <th className="px-4 py-2 border-b">Prix TTC</th>
                      <th className="px-4 py-2 border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {articles.map((article) => {
                      const prixUnitaireNum = parseFloat(article.prix_unitaire) || 0;
                      const tauxTvaNum = parseFloat(article.taux_tva) || 0;
                      const tva = (prixUnitaireNum * tauxTvaNum) / 100;
                      const prixTTC = (prixUnitaireNum + tva).toFixed(2);
                      return (
                        <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-2 border-b">{article.code_article}</td>
                          <td className="px-4 py-2 border-b">{article.designation}</td>
                          <td className="px-4 py-2 border-b">{article.description}</td>
                          <td className="px-4 py-2 border-b">{article.prix_unitaire} €</td>
                          <td className="px-4 py-2 border-b">{article.taux_tva}</td>
                          <td className="px-4 py-2 border-b">{prixTTC} €</td>
                          <td className="px-4 py-2 border-b">
                            <button
                              onClick={() => handleEdit(article)}
                              className="text-blue-600 hover:text-blue-800 mr-2"
                            >
                              Modifier
                            </button>
                            <button
                              onClick={() => handleDelete(article.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Supprimer
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ManageArticles;
