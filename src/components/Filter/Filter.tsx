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
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar receitas, ingredientes..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-border rounded-xl bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedFilter === filter.id
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-muted text-muted-foreground hover:bg-primary hover:text-white'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
