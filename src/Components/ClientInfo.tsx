
import * as React from 'react';
import FormInput from './FormInput';

interface ClientInfoProps {
 TelEntreprise: string;
 AdresseEntreprise: string;
 Nom: string;
 AdresseClient: string;
 ContacteClient: string;

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ClientInfo: React.FC<ClientInfoProps> = ({ TelEntreprise, AdresseEntreprise, Nom, AdresseClient, ContacteClient,  onChange }) => (
  <div className='display flex justify-between'>
    <div className=" rounded-b-lg ">
    
    <h3>Adresse Entreprise: 3k&Fils@gmail.com</h3>
    <h4>Contacte: 0194532053</h4>
    
    </div>
    <div className=" rounded-b-lg border-solid border-2 border-black">
      <div className='bg-slate-300'>
        <h2 >Info Client</h2>
      </div>
        <FormInput
          label="Nom *"
          name="Nom"
          value={Nom}
          onChange={onChange}
          required
        />
      <FormInput
          label="AdresseClient *"
          name="AdresseClient"
          value={AdresseClient}
          onChange={onChange}
          required
        />
          <FormInput
          label="ContacteClient*"
          name="ContacteClient"
          value={ContacteClient}
          onChange={onChange}
          required
        />
        <FormInput
          label="IFU*"
          name="IFU"
          value={ContacteClient}
          onChange={onChange}
          required
        />
    </div>
  
  </div>
);

export default ClientInfo;
