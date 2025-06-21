
     import React from 'react';

     interface Option {
       value: string;
       label: string;
     }

     interface FormSelectProps {
       label: string;
       name: string;
       value: string;
       onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
       options: Option[];
       required?: boolean;
     }

     const FormSelect: React.FC<FormSelectProps> = ({ label, name, value, onChange, options, required }) => {
       return (
         <div>
           <label className="block text-sm font-medium text-gray-700">{label}</label>
           <select
             name={name}
             value={value}
             onChange={onChange}
             className="w-full p-2 border border-gray-300 rounded-md"
             required={required}
           >
             {options.map((option) => (
               <option key={option.value} value={option.value}>
                 {option.label}
               </option>
             ))}
           </select>
         </div>
       );
     };

     export default FormSelect;
    