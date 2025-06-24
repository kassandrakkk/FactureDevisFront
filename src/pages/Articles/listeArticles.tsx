import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar';

interface Article {
  id: string;
  company_id: string;
  code_article: string;
  designation: string;
  description: string;
  prix_unitaire: string;
  taux_tva: string;
}

const ArticleList: React.FC = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = React.useState<Article[]>([]);

  // Charger les articles depuis localStorage au montage du composant
  React.useEffect(() => {
    const loadArticles = () => {
      const savedArticles = localStorage.getItem('articles');
      if (savedArticles) {
        setArticles(JSON.parse(savedArticles));
      } else {
        // Articles par défaut si aucun n'existe
        const defaultArticles = [
          {
            id: crypto.randomUUID(),
            company_id: 'COMP001',
            code_article: 'ART001',
            designation: 'Chips Premium',
            description: 'Chips de pomme de terre artisanales',
            prix_unitaire: '10.00',
            taux_tva: '20'
          },
          {
            id: crypto.randomUUID(),
            company_id: 'COMP001',
            code_article: 'ART002',
            designation: 'Aklui Traditional',
            description: 'Aklui fait maison selon la recette traditionnelle',
            prix_unitaire: '15.00',
            taux_tva: '20'
          },
          {
            id: crypto.randomUUID(),
            company_id: 'COMP001',
            code_article: 'ART003',
            designation: 'Orange Bio',
            description: 'Oranges biologiques cultivées localement',
            prix_unitaire: '5.00',
            taux_tva: '10'
          }
        ];
        setArticles(defaultArticles);
        localStorage.setItem('articles', JSON.stringify(defaultArticles));
      }
    };

    loadArticles();

    // Écouter les changements dans localStorage (pour synchroniser entre onglets)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'articles' && e.newValue) {
        setArticles(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Écouter également les événements personnalisés pour la synchronisation
    const handleArticleUpdate = () => {
      loadArticles();
    };

    window.addEventListener('articleUpdated', handleArticleUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('articleUpdated', handleArticleUpdate);
    };
  }, []);

  const calculatePrixTTC = (prixUnitaire: string, tauxTva: string): string => {
    const prixUnitaireNum = parseFloat(prixUnitaire) || 0;
    const tauxTvaNum = parseFloat(tauxTva) || 0;
    const tva = (prixUnitaireNum * tauxTvaNum) / 100;
    return (prixUnitaireNum + tva).toFixed(2);
  };

  const handleEdit = (article: Article) => {
    // Stocker l'article à modifier dans localStorage pour le récupérer dans CreateArticle
    localStorage.setItem('editingArticle', JSON.stringify(article));
    navigate('/CreateArticle');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      const updatedArticles = articles.filter((a) => a.id !== id);
      setArticles(updatedArticles);
      localStorage.setItem('articles', JSON.stringify(updatedArticles));
      
      // Déclencher un événement pour informer les autres composants
      window.dispatchEvent(new CustomEvent('articleUpdated'));
    }
  };

  const handleCreate = () => {
    // Supprimer l'article en cours d'édition s'il existe
    localStorage.removeItem('editingArticle');
    navigate('/CreateArticle');
  };

  return (
    <div className="flex w-full h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 min-w-0 p-6 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Liste des Articles</h2>
            <p className="text-gray-600 mt-1">Gérez vos articles et leurs informations</p>
          </div>
          <button
            onClick={handleCreate}
            className="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors shadow-md flex items-center"
          >
            <span className="mr-2">+</span>
            Créer un Article
          </button>
        </header>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {articles.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucun article trouvé</h3>
              <p className="text-gray-500 mb-6">Commencez par créer votre premier article</p>
              <button
                onClick={handleCreate}
                className="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
              >
                Créer un Article
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Code Article
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Désignation
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Prix Unitaire
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      TVA (%)
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Prix TTC
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {articles.map((article, index) => {
                    const prixTTC = calculatePrixTTC(article.prix_unitaire, article.taux_tva);
                    return (
                      <tr 
                        key={article.id} 
                        className={`hover:bg-gray-50 transition-colors ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {article.code_article || 'N/A'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {article.designation}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-700 max-w-xs truncate">
                            {article.description || 'Aucune description'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm font-semibold text-gray-900">
                            {parseFloat(article.prix_unitaire).toFixed(2)} FCFA
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {article.taux_tva}%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm font-bold text-green-600">
                            {prixTTC} €
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex justify-center space-x-2">
                            <button
                              onClick={() => handleEdit(article)}
                              className="px-3 py-1.5 bg-amber-500 text-white text-xs rounded-md hover:bg-amber-600 transition-colors shadow-sm flex items-center"
                            >
                              <span className="mr-1">✏</span>
                              Modifier
                            </button>
                            <button
                              onClick={() => handleDelete(article.id)}
                              className="px-3 py-1.5 bg-red-500 text-white text-xs rounded-md hover:bg-red-600 transition-colors shadow-sm flex items-center"
                            >
                              <span className="mr-1">🗑</span>
                              Supprimer
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {articles.length > 0 && (
          <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
            <div>
              Total: {articles.length} article{articles.length > 1 ? 's' : ''}
            </div>
            <div>
              Valeur totale TTC: {
                articles.reduce((total, article) => {
                  const prixTTC = parseFloat(calculatePrixTTC(article.prix_unitaire, article.taux_tva));
                  return total + prixTTC;
                }, 0).toFixed(2)
              } €
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ArticleList;