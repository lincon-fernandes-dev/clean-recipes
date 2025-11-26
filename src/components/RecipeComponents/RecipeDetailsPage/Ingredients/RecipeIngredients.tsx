import { Recipe } from '@/@core/domain/entities/Recipe';

interface RecipeIngredientsComponent {
  recipe: Recipe;
}

const RecipeIngredientsComponent: React.FC<RecipeIngredientsComponent> = ({
  recipe,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Ingredientes
        </h2>
        <ul className="space-y-3">
          {recipe!.ingredients?.map((ingredient, index) => (
            <li key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
              <span className="text-foreground leading-relaxed">
                {ingredient.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeIngredientsComponent;
