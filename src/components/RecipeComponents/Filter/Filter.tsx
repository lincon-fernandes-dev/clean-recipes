import Button from '@/components/templates/base/Button/Button';
import Input from '@/components/templates/form/Input/Input';
import { Search } from 'lucide-react';

const FilterSection: React.FC<{
  search: string;
  onSearchChange: (value: string) => void;
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}> = ({ search, onSearchChange, selectedFilter, onFilterChange }) => {
  const filters = [
    { id: 'all', label: 'Todas' },
    { id: 'popular', label: 'Populares' },
    { id: 'recent', label: 'Recentes' },
    { id: 'easy', label: 'Fáceis' },
    { id: 'dessert', label: 'Sobremesas' },
  ];

  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm border border-border mb-8">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="absolute z-10 left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
          <Input
            type="text"
            placeholder="Buscar receitas, ingredientes..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className=" pl-10 pr-4 py-3 border border-border rounded-xl bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={selectedFilter === filter.id ? 'primary' : 'outline'}
              onClick={() => onFilterChange(filter.id)}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
