
import * as React from 'react';
import FormInput from './FormInput';
import FormSelect from './FormSelect';

interface FilterSectionProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  filterValue: string;
  setFilterValue: (value: string) => void;
  searchLabel?: string;
  sortOptions: { value: string; label: string }[];
  filterOptions: { value: string; label: string }[];
}

const FilterSection: React.FC<FilterSectionProps> = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  filterValue,
  setFilterValue,
  searchLabel = 'Rechercher',
  sortOptions,
  filterOptions,
}) => (
  <div className="flex justify-between items-center mb-6">
    <FormInput
      label={searchLabel}
      name="searchTerm"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <div className="flex space-x-4">
      <FormSelect
        label="Trier par :"
        name="sortBy"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        options={sortOptions}
      />
      <FormSelect
        label="Filtrer par :"
        name="filterValue"
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
        options={filterOptions}
      />
    </div>
  </div>
);

export default FilterSection;
