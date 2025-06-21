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

const CreateArticle: React.FC = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = React.useState<Article[]>(() => {
    const savedArticles = localStorage.getItem('articles');
    return savedArticles ? JSON.parse(savedArticles) : [];
  });

  const [editingArticle, setEditingArticle] = React.useState<Article | null>(() => {
    const editingData = localStorage.getItem('editingArticle');
    return editingData ? JSON.parse(editingData) : null;
  });

  const [formData, setFormData] = React.useState<Article>(() => {
    if (editingArticle) {
      return editingArticle;
    }
    return {
      id: crypto.randomUUID(),
      company_id: 'COMP001',
      code_article: '',
      designation: '',
      description: '',
      prix_unitaire: '',
      taux_tva: '20',
    };
  });

  const [prixTTC, setPrixTTC] = React.useState<string>('0.00');
  const [errors, setErrors] = React.useState<{[key: string]: string}>({});

  // Calculer le prix TTC à chaque changement
  React.useEffect(() => {
    const prixUnitaireNum = parseFloat(formData.prix_unitaire) || 0;
    const tauxTvaNum = parseFloat(formData.taux_tva) || 0;
    const tva = (prixUnitaireNum * tauxTvaNum) / 100;
    const calculatedPrixTTC = (prixUnitaireNum + tva).toFixed(2);
    setPrixTTC(calculatedPrixTTC);
  }, [formData.prix_unitaire, formData.taux_tva]);

  const generateArticleCode = () => {
    const existingCodes = articles.map(a => a.code_article).filter(code => code.startsWith('ART'));
    let newNumber = 1;
    let newCode = '';
    
    do {
      newCode = `ART${newNumber.toString().padStart(3, '0')}`;

      newNumber++;
    } while (existingCodes.includes(newCode));
    
    return newCode;
  };

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.designation.trim()) {
      newErrors.designation = 'La désignation est obligatoire';
    }

    if (!formData.prix_unitaire || parseFloat(formData.prix_unitaire) <= 0) {
      newErrors.prix_unitaire = 'Le prix unitaire doit être supérieur à 0';
    }

    if (!formData.taux_tva || parseFloat(formData.taux_tva) < 0) {
      newErrors.taux_tva = 'Le taux de TVA doit être positif';
    }

    // Vérifier l'unicité du code article (sauf pour l'article en cours de modification)
    if (formData.code_article) {
      const codeExists = articles.some(article => 
        article.code_article === formData.code_article && 
        article.id !== formData.id
      );
      if (codeExists) {
        newErrors.code_article = 'Ce code article existe déjà';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Effacer l'erreur pour ce champ
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const articleToSave = {
      ...formData,
      code_article: formData.code_article || generateArticleCode(),
    };

    let updatedArticles: Article[];

    if (editingArticle) {
      // Mode modification
      updatedArticles = articles.map(article => 
        article.id === editingArticle.id ? articleToSave : article
      );
    } else {
      // Mode création
      updatedArticles = [...articles, articleToSave];
    }

    // Sauvegarder dans localStorage
    localStorage.setItem('articles', JSON.stringify(updatedArticles));
    
    // Déclencher un événement pour informer les autres composants
    window.dispatchEvent(new CustomEvent('articleUpdated'));
    
    // Nettoyer l'article en cours d'édition
    localStorage.removeItem('editingArticle');
    
    // Afficher un message de succès (optionnel)
    alert(editingArticle ? 'Article modifié avec succès !' : 'Article créé avec succès !');
    
    // Rediriger vers la liste
    navigate('/ListeArticles');
  };

  const handleCancel = () => {
    localStorage.removeItem('editingArticle');
    navigate('/ListeArticles');
  };

  const handleAutoGenerateCode = () => {
    const newCode = generateArticleCode();
    setFormData(prev => ({ ...prev, code_article: newCode }));
  };

  return (
    <div className="flex w-full h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 min-w-0 p-6 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              {editingArticle ? 'Modifier l\'Article' : 'Créer un Article'}
            </h2>
            <p className="text-gray-600 mt-1">
              {editingArticle ? 'Modifiez les informations de l\'article' : 'Ajoutez un nouvel article à votre catalogue'}
            </p>
          </div>
          <button
            onClick={handleCancel}
            className="text-gray-600 hover:text-blue-600 flex items-center text-lg transition-colors"
          >
            <span className="mr-2">⬅</span> Retour à la liste
          </button>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <h3 className="text-xl font-semibold text-white">
                Informations de l'article
              </h3>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Code Article */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="md:col-span-2">
                  <FormInput
                    label="Code Article"
                    name="code_article"
                    value={formData.code_article}
                    onChange={handleInputChange}
                    placeholder="Ex: ART001 (optionnel - généré automatiquement)"
                    className="w-full"
                    error={errors.code_article}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAutoGenerateCode}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  🎲 Générer
                </button>
              </div>

              {/* Désignation */}
              <FormInput
                label="Désignation (Nom de l'article) *"
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                required
                placeholder="Ex: Ordinateur portable Dell XPS 13"
                className="w-full"
                error={errors.designation}
              />

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Description détaillée de l'article (optionnel)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Prix et TVA */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Prix Unitaire (€) *"
                  name="prix_unitaire"
                  value={formData.prix_unitaire}
                  onChange={handleInputChange}
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  placeholder="0.00"
                  className="w-full"
                  error={errors.prix_unitaire}
                />
                
                <FormInput
                  label="Taux TVA (%) *"
                  name="taux_tva"
                  value={formData.taux_tva}
                  onChange={handleInputChange}
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  placeholder="20.00"
                  className="w-full"
                  error={errors.taux_tva}
                />
              </div>

              {/* Aperçu du prix TTC */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-blue-800 font-medium">Prix TTC calculé :</span>
                  <span className="text-2xl font-bold text-blue-900">{prixTTC} €</span>
                </div>
                {parseFloat(formData.prix_unitaire) > 0 && parseFloat(formData.taux_tva) >= 0 && (
                  <div className="text-sm text-blue-600 mt-2">
                    TVA: {((parseFloat(formData.prix_unitaire) * parseFloat(formData.taux_tva)) / 100).toFixed(2)} €
                  </div>
                )}
              </div>

              {/* Boutons d'action */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors shadow-md"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors shadow-md flex items-center"
                >
                  <span className="mr-2">
                    {editingArticle ? '💾' : '➕'}
                  </span>
                  {editingArticle ? 'Mettre à jour' : 'Créer l\'article'}
                </button>
              </div>
            </form>
          </div>

          {/* Aperçu de l'article */}
          {(formData.designation || formData.prix_unitaire) && (
            <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Aperçu de l'article</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Code:</span>
                    <span className="ml-2 font-medium">{formData.code_article || 'Généré automatiquement'}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Désignation:</span>
                    <span className="ml-2 font-medium">{formData.designation || 'Non défini'}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Prix HT:</span>
                    <span className="ml-2 font-medium">{formData.prix_unitaire || '0.00'} €</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Prix TTC:</span>
                    <span className="ml-2 font-bold text-green-600">{prixTTC} €</span>
                  </div>
                </div>
                {formData.description && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <span className="text-gray-600">Description:</span>
                    <p className="mt-1 text-gray-800">{formData.description}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CreateArticle;