import * as React from 'react';
import FormInput from './FormInput';
import FormCheckbox from './FormChekbox';
import FormSelect from './FormSelect';

interface PaymentInfoProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  estSigne: boolean;
  dateSignature?: string;
  signatureUrl?: string;
  ModePaiement: 'VirementBancaire' | 'Momo';
  NumeroCompte: number;
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaymentInfo: React.FC<PaymentInfoProps> = ({
  onChange,
  estSigne,
  dateSignature,
  signatureUrl,
  ModePaiement,
  NumeroCompte,
  onCheckboxChange
}) => (
  <div className="bg-gray-100 p-4 rounded-lg">
    <h4 className="text-lg font-medium text-gray-700 mb-2">Informations de paiement</h4>

    <FormSelect
      label="Mode de paiement *"
      name="modePaiement"
      value={ModePaiement}
      onChange={onChange}
      options={[
        { value: 'VirementBancaire', label: 'Virement bancaire' },
        { value: 'Momo', label: 'Momo' },
      ]}
      required
    />

    <FormInput
    label='Compte'
        type="NumeroCompte"
        name="NumeroCompte"
        value={NumeroCompte}
        onChange={onChange}
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />


    <div className="mt-4">
      <p>Date :</p>
      <FormCheckbox
        label="Est signé ?"
        name="estSigne"
        checked={estSigne}
        onChange={onCheckboxChange}
      />

      {estSigne && (
        <>
          <FormInput
            label="Date de Signature"
            name="dateSignature"
            value={dateSignature || ''}
            onChange={onChange}
            type="date"
          />
          <FormInput
            label="URL de la Signature"
            name="signatureUrl"
            value={signatureUrl || ''}
            onChange={onChange}
          />
        </>
      )}

      <p className="mt-2">Signature :</p>
      <div className="border-dashed border-2 border-gray-300 p-4 rounded-md text-center">
        [Espace pour signature]
      </div>
    </div>
  </div>
);

export default PaymentInfo;
