import { INutritionInfo } from '@/Domain/Interfaces/INutritionInfo';

interface RecipeDetailNutritionInfoComponentProps {
  nutritionInfo: INutritionInfo;
}

const RecipeDetailNutritionInfoComponent: React.FC<
  RecipeDetailNutritionInfoComponentProps
> = ({ nutritionInfo }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <h3 className="font-semibold text-foreground mb-3">
        Informação Nutricional (por porção)
      </h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
        <div>
          <span className="text-muted-foreground">Calorias</span>
          <p className="font-medium text-foreground">
            {nutritionInfo.calories} kcal
          </p>
        </div>
        <div>
          <span className="text-muted-foreground">Proteínas</span>
          <p className="font-medium text-foreground">
            {nutritionInfo.proteins}
          </p>
        </div>
        <div>
          <span className="text-muted-foreground">Carboidratos</span>
          <p className="font-medium text-foreground">{nutritionInfo.carbs}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Gorduras</span>
          <p className="font-medium text-foreground">{nutritionInfo.fat}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailNutritionInfoComponent;
