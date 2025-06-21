
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar';
import FormInput from '../../Components/FormInput';

interface Article {
  id: string;
  description: string;
  prixUnitaire: string;
  prixTTC: string;
}

const EditArticle: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = React.useState<Article | null>(null);
  const [initialArticle, setInitialArticle] = React.useState<Article | null>(null);

  // Simuler une liste d'articles (remplacez par une API plus tard)
  const [articles, setArticles] = React.useState<Article[]>([
    { id: '1', description: 'Chips', prixUnitaire: '10.00', prixTTC: '12.00' },
    { id: '2', description: 'Aklui', prixUnitaire: '15.00', prixTTC: '18.00' },
    { id: '3', description: 'Orange', prixUnitaire: '5.00', prixTTC: '6.00' },
  ]);

  React.useEffect(() => {
    const foundArticle = articles.find((a) => a.id === id);
    if (foundArticle) {
      setArticle({ ...foundArticle });
      setInitialArticle({ ...foundArticle });
    }
  }, [id, articles]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (article) {
      setArticle({ ...article, [name]: value });
      // Recalculer prixTTC si prixUnitaire change (TVA 20%)
      if (name === 'prixUnitaire' && value) {
        const prixUnitaireNum = parseFloat(value) || 0;
        const tva = prixUnitaireNum * 0.2;
        const prixTTCNum = prixUnitaireNum + tva;
        setArticle({ ...article, prixTTC: prixTTCNum.toFixed(2) });
      }
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (article && initialArticle) {
      setArticles(articles.map((a) => (a.id === article.id ? article : a)));
      navigate('/article-list');
    }
  };

  const handleCancel = () => {
    navigate('/article-list');
  };

  if (!article) return <div>Article non trouvé</div>;

  return (
    <div className="flex w-full h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 min-w-0 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Modifier un Article</h2>
          <button
            onClick={() => navigate('/article-list')}
            className="text-gray-600 hover:text-blue-600 flex items-center"
          >
            <span className="mr-2">⬅</span> Retour
          </button>
        </header>

        <div className="bg-white rounded-lg shadow-xl p-6">
          <form onSubmit={handleSave} className="space-y-4">
            <FormInput
              label="Description *"
              name="description"
              value={article.description}
              onChange={handleInputChange}
              required
            />
            <FormInput
              label="Prix Unitaire *"
              name="prixUnitaire"
              value={article.prixUnitaire}
              onChange={handleInputChange}
              type="number"
              step="0.01"
              required
            />
            <FormInput
              label="Prix TTC *"
              name="prixTTC"
              value={article.prixTTC}
              onChange={handleInputChange}
              type="number"
              step="0.01"
              required
            />
            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Sauvegarder
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditArticle;
