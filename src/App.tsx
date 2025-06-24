
import { Routes, Route } from 'react-router-dom';
import Inscription from './pages/Auth/Inscription';
import Connexion from './pages/Auth/Connexion';
import MDPOublié from './pages/Auth/MDPOublié';
import ConfigCompte from './pages/Auth/ConfigCompte';
import Verification from './pages/Auth/Verification';
import Code from './pages/Auth/Code';
import DashboardAdmin from './pages/DashboardAdmin'
import CreateDevis from './pages/Devis/CreateDevis';
import ListeDevis from './pages/Devis/ListeDevis';
import UpdateDevis from './pages/Devis/UpdateDevis'
import CreateFactures from './pages/Factures/CreateFactures';
import UpdateFactures from './pages/Factures/UpdateFactures'
import ListeFactures from './pages/Factures/ListeFactures';
import CreateArticle from './pages/Articles/CreateArticle';
import ListeArticles from './pages/Articles/listeArticles';
import UpdatesArticle from './pages/Articles/UpdatesArticle';
import AllClient from './pages/Clients/AllClient';
import CreateClient from './pages/Clients/CreateClient';
import UpdateClient from './pages/Clients/UpdateClient';
import HistEdit from './pages/Historique/HistEdit'
import Home from './pages/Accueil';
import Parametre from './pages/Auth/Parametre';
function App() {
  console.log('Rendering App component');
  return (
    <Routes>
      <Route path="/"element={<Home />} />
      <Route path="/inscription" element={<Inscription />} />
      <Route path="/connexion" element={<Connexion />} />
      <Route path="/MDPOublié" element={<MDPOublié/>} />
      <Route path="/ConfigCompte" element={<ConfigCompte />} />
       <Route path="/parametre" element={<Parametre />} />
       <Route path="/Verification" element={<Verification />} />
        <Route path="/DashboardAdmin" element={<DashboardAdmin/>} />
        <Route path="/CreateDevis" element={<CreateDevis/>} />
        <Route path="/ListeDevis" element={<ListeDevis/>} />
         <Route path="/UpdateDevis" element={<UpdateDevis/>} />
          <Route path="/CreateFactures" element={<CreateFactures/>} />
          <Route path="/UpdateFactures" element={<UpdateFactures/>} />
          <Route path="/ListeFactures" element={<ListeFactures/>} />
            <Route path="/CreateArticle" element={<CreateArticle/>} />
            <Route path="/ListeArticles" element={<ListeArticles/>} />
            <Route path="/UpdatesArticles" element={<UpdatesArticle/>} />
              <Route path="/AllClient" element={<AllClient/>} />
               <Route path="/CreateClient" element={<CreateClient/>} />
              <Route path="/UpdateClient" element={<UpdateClient/>} />
              <Route path="/HistEdit" element={<HistEdit/>} />




        <Route path="/Code" element={<Code/>} />
      <Route path="*" element={<div>404 - Page non trouvée</div>} />
    </Routes>
  );
}

export default App;