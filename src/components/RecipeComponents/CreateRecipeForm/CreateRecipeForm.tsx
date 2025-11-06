// src/components/RecipeForm/RecipeForm.tsx
'use client';

import ImagePicker from '@/components/ImagePicker/imagePicker';
import Button from '@/components/templates/base/Button/Button';
import Input from '@/components/templates/form/Input/Input';
import { IIngredient } from '@/Domain/Interfaces/IIngredient';
import { IInstruction } from '@/Domain/Interfaces/IInstruction';
import { IUser } from '@/Domain/Interfaces/IUser';
import { Clock, Plus, Trash2, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';

interface RecipeFormProps {
  onSubmit: (recipeData: CreateRecipeData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  currentUser: IUser;
}

export interface CreateRecipeData {
  title: string;
  description: string;
  imageUrl: string;
  preparationTime: number;
  servings: number;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  ingredients: IIngredient[];
  instructions: IInstruction[];
  tags: string[];
}

// Helper functions to convert between string and object formats
const createIngredientFromString = (
  text: string,
  index: number
): IIngredient => ({
  id: index + 1,
  name: text.trim(),
  // Add other properties if your IIngredient interface requires them
});

const createInstructionFromString = (
  text: string,
  index: number
): IInstruction => ({
  id: index + 1,
  content: text.trim(),
  stepNumber: index + 1,
});

export const RecipeForm: React.FC<RecipeFormProps> = ({
  onSubmit,
  onCancel,
  isLoading = false,
  currentUser,
}) => {
  const [formData, setFormData] = useState<CreateRecipeData>({
    title: '',
    description: '',
    imageUrl: '/recipes/bolo-cenoura.jpg',
    preparationTime: 30,
    servings: 4,
    difficulty: 'Fácil',
    ingredients: [],
    instructions: [],
    tags: [],
  });

  const [newIngredient, setNewIngredient] = useState('');
  const [newInstruction, setNewInstruction] = useState('');
  const [newTag, setNewTag] = useState('');

  const handleInputChange = (
    field: keyof CreateRecipeData,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addIngredient = () => {
    if (newIngredient.trim()) {
      const newIngredientObj = createIngredientFromString(
        newIngredient,
        formData.ingredients.length
      );
      setFormData((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, newIngredientObj],
      }));
      setNewIngredient('');
    }
  };

  const removeIngredient = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = {
      ...newIngredients[index],
      name: value,
    };
    setFormData((prev) => ({
      ...prev,
      ingredients: newIngredients,
    }));
  };

  const addInstruction = () => {
    if (newInstruction.trim()) {
      const newInstructionObj = createInstructionFromString(
        newInstruction,
        formData.instructions.length
      );
      setFormData((prev) => ({
        ...prev,
        instructions: [...prev.instructions, newInstructionObj],
      }));
      setNewInstruction('');
    }
  };

  const removeInstruction = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index),
    }));
  };

  const updateInstruction = (index: number, value: string) => {
    const newInstructions = [...formData.instructions];
    newInstructions[index] = {
      ...newInstructions[index],
      content: value,
    };
    setFormData((prev) => ({
      ...prev,
      instructions: newInstructions,
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar campos obrigatórios
    if (!formData.title.trim() || !formData.description.trim()) {
      alert('Título e descrição são obrigatórios');
      return;
    }

    // Validar que há pelo menos um ingrediente e uma instrução
    const validIngredients = formData.ingredients.filter((ing) =>
      ing.name.trim()
    );
    const validInstructions = formData.instructions.filter((inst) =>
      inst.content.trim()
    );

    if (validIngredients.length === 0) {
      alert('Adicione pelo menos um ingrediente');
      return;
    }

    if (validInstructions.length === 0) {
      alert('Adicione pelo menos uma instrução');
      return;
    }

    // Atualizar step numbers das instruções
    const instructionsWithStepNumbers = validInstructions.map(
      (instruction, index) => ({
        ...instruction,
        stepNumber: index + 1,
      })
    );

    // Atualizar IDs dos ingredientes
    const ingredientsWithUpdatedIds = validIngredients.map(
      (ingredient, index) => ({
        ...ingredient,
        id: index + 1,
      })
    );

    const filteredData = {
      ...formData,
      ingredients: ingredientsWithUpdatedIds,
      instructions: instructionsWithStepNumbers,
    };

    console.log('Enviando receita:', filteredData);
    console.log('Autor:', currentUser);
    onSubmit(filteredData);
  };

  const handleKeyPress = (e: React.KeyboardEvent, callback: () => void) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      callback();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Informações Básicas */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Informações Básicas
        </h2>

        <div className="space-y-6">
          <Input
            label="Título da Receita *"
            placeholder="Ex: Bolo de Chocolate Caseiro"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            minLength={3}
            maxLength={100}
            required
          />

          <ImagePicker label="Your image" name="image" />

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Descrição *
            </label>
            <textarea
              placeholder="Descreva sua receita... O que a torna especial?"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className="w-full p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground placeholder-muted-foreground resize-none transition-colors"
              required
              minLength={25}
              maxLength={524}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Tempo de Preparo (minutos) *
              </label>
              <Input
                type="number"
                min="1"
                value={formData.preparationTime}
                onChange={(e) =>
                  handleInputChange(
                    'preparationTime',
                    parseInt(e.target.value) || 30
                  )
                }
                required
                max={1440}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Porções *
              </label>
              <Input
                type="number"
                min="1"
                value={formData.servings}
                onChange={(e) =>
                  handleInputChange('servings', parseInt(e.target.value) || 4)
                }
                required
                max={100}
              />
            </div>

            <div>
              <label className=" text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Dificuldade *
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) =>
                  handleInputChange('difficulty', e.target.value)
                }
                className="w-full p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground transition-colors"
                required
              >
                <option value="Fácil">Fácil</option>
                <option value="Médio">Médio</option>
                <option value="Difícil">Difícil</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Ingredientes */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Ingredientes *
        </h2>

        <div className="space-y-3">
          {formData.ingredients.map((ingredient, index) => (
            <div key={ingredient.id} className="flex items-center gap-3 group">
              <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0 font-medium text-sm">
                {index + 1}
              </div>
              <div className="flex-1">
                <Input
                  placeholder={`Ingrediente ${index + 1}`}
                  value={ingredient.name}
                  onChange={(e) => updateIngredient(index, e.target.value)}
                  onKeyPress={(e) =>
                    e.key === 'Enter' &&
                    (e.preventDefault(),
                    document.getElementById('new-ingredient')?.focus())
                  }
                  minLength={2}
                  maxLength={200}
                />
              </div>
              {formData.ingredients.length > 1 && (
                <Button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-4">
          <Input
            id="new-ingredient"
            placeholder="Novo ingrediente..."
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, addIngredient)}
          />
          <Button
            type="button"
            variant="outline"
            icon={Plus}
            onClick={addIngredient}
            disabled={!newIngredient.trim()}
          >
            Adicionar
          </Button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Modo de Preparo *
        </h2>

        <div className="space-y-4">
          {formData.instructions.map((instruction, index) => (
            <div key={instruction.id} className="flex items-start gap-3 group">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shrink-0 font-semibold text-sm mt-1">
                {index + 1}
              </div>
              <div className="flex-1">
                <textarea
                  placeholder={`Passo ${index + 1}`}
                  value={instruction.content}
                  onChange={(e) => updateInstruction(index, e.target.value)}
                  rows={3}
                  className="w-full p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground placeholder-muted-foreground resize-none transition-colors"
                  minLength={8}
                  maxLength={500}
                />
              </div>
              {formData.instructions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeInstruction(index)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-colors opacity-0 group-hover:opacity-100 mt-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-4">
          <textarea
            placeholder="Novo passo..."
            value={newInstruction}
            onChange={(e) => setNewInstruction(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, addInstruction)}
            rows={3}
            className="flex-1 p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground placeholder-muted-foreground resize-none transition-colors"
          />
          <Button
            type="button"
            variant="outline"
            icon={Plus}
            onClick={addInstruction}
            disabled={!newInstruction.trim()}
            className="self-start"
          >
            Adicionar
          </Button>
        </div>
      </div>

      {/* Tags */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-foreground mb-6">Tags</h2>

        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium flex items-center gap-1 group hover:bg-primary/20 transition-colors"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="hover:text-primary-dark text-xs"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-3">
          <Input
            placeholder="Nova tag (ex: Sobremesa, Saudável, Brasileira...)"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, addTag)}
          />
          <Button
            type="button"
            variant="outline"
            icon={Plus}
            onClick={addTag}
            disabled={!newTag.trim()}
          >
            Adicionar
          </Button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 pt-6 border-t border-border">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          disabled={isLoading}
          className="min-w-32"
        >
          {isLoading ? 'Criando...' : 'Criar Receita'}
        </Button>
      </div>
    </form>
  );
};
