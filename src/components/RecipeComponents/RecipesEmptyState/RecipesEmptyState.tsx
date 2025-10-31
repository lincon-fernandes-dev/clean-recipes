import { Search } from 'lucide-react';

interface RecipesEmptyStateProps {
  type?: 'no-results' | 'no-recipes';
}

export const RecipesEmptyState: React.FC<RecipesEmptyStateProps> = ({
  type = 'no-results',
}) => {
  const config = {
    'no-results': {
      icon: <Search className="w-16 h-16 text-muted-foreground opacity-50" />,
      title: 'Nenhuma receita encontrada',
      description: 'Tente ajustar sua busca ou filtro para ver mais receitas.',
    },
    'no-recipes': {
      icon: <Search className="w-16 h-16 text-muted-foreground opacity-50" />,
      title: 'Nenhuma receita disponível',
      description: 'Ainda não há receitas cadastradas no sistema.',
    },
  };

  const { icon, title, description } = config[type];

  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        {icon}
        <h3 className="text-xl font-semibold text-foreground mb-2 mt-4">
          {title}
        </h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
