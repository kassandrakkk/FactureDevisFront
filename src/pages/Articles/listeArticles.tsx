
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar';
import FormInput from '../../Components/FormInput';

interface Article {
  id: string;
  description: string;
  prixUnitaire: string;
  prixTTC: string;
}

const ArticleList: React.FC = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = React.useState<Article[]>([
    { id: crypto.randomUUID(), description: 'Chips', prixUnitaire: '10.00', prixTTC: '12.00' },
    { id: crypto.randomUUID(), description: 'Aklui', prixUnitaire: '15.00', prixTTC: '18.00' },
    { id: crypto.randomUUID(), description: 'Orange', prixUnitaire: '5.00', prixTTC: '6.00' },
  ]); // Données initiales simulées

  const handleEdit = (id: string) => {
    navigate(`/manage-articles/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    setArticles(articles.filter((a) => a.id !== id));
  };

  return (
    <div className="flex w-full h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 min-w-0 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Liste des Articles</h2>
         <button
            onClick={() => navigate('/CreateArticle')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Créer
          </button>
        </header>

        <div className="bg-white rounded-lg shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-800">
                  <th className="p-2 border border-gray-300 text-left">Description</th>
                  <th className="p-2 border border-gray-300 text-right">Prix Unitaire</th>
                  <th className="p-2 border border-gray-300 text-right">Prix TTC</th>
                  <th className="p-2 border border-gray-300 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id} className="border-b border-gray-300">
                    <td className="p-2">{article.description}</td>
                    <td className="p-2 text-right">{article.prixUnitaire} €</td>
                    <td className="p-2 text-right">{article.prixTTC} €</td>
                    <td className="p-2 text-center">
                      <button
                        onClick={() => handleEdit(article.id)}
                        className="px-2 py-1 bg-yellow-500 text-white rounded-md mr-2 hover:bg-yellow-600"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArticleList;
