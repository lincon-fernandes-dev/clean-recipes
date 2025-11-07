// src/components/RecipeResultsHeader/RecipeResultsHeader.tsx
interface RecipeResultsHeaderProps {
  selectedFilter: string;
  resultCount: number;
  searchQuery?: string;
}

const getHeaderTitle = (filter: string): string => {
  const titles: Record<string, string> = {
    all: 'Receitas em Destaque',
    popular: 'Receitas Populares',
    recent: 'Receitas Recentes',
    easy: 'Receitas Fáceis',
    dessert: 'Sobremesas',
  };

  return titles[filter] || 'Receitas';
};

export const RecipeResultsHeader: React.FC<RecipeResultsHeaderProps> = ({
  selectedFilter,
  resultCount,
  searchQuery,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <div>
        <h2 className="text-3xl font-bold text-accent">
          {getHeaderTitle(selectedFilter)}
        </h2>
        <p className="text-primary mt-2">{resultCount} receitas encontradas</p>
      </div>

      {searchQuery && (
        <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg">
          Buscando por: &quot;{searchQuery}&quot;
        </div>
      )}
    </div>
  );
};
