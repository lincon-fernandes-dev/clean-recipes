import { Recipe } from '@/@core/domain/entities/Recipe';

interface RecipeInstructionsComponentProps {
  recipe: Recipe;
}
const RecipeInstructionsComponent: React.FC<
  RecipeInstructionsComponentProps
> = ({ recipe }) => {
  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Modo de Preparo
        </h2>
        <ol className="space-y-4">
          {recipe.instructions?.map((instruction, index) => (
            <li key={index} className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shrink-0 font-semibold text-sm">
                {index + 1}
              </div>
              <p className="text-foreground leading-relaxed pt-1">
                {instruction.content}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipeInstructionsComponent;
