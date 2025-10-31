// src/components/RecipeForm/RecipeForm.tsx
'use client';

import Button from '@/components/templates/base/Button/Button';
import Input from '@/components/templates/form/Input/Input';
import { IUser } from '@/Domain/Interfaces/IUser';
import { Plus, Trash2 } from 'lucide-react';
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
  ingredients: string[];
  instructions: string[];
  tags: string[];
}

export const RecipeForm: React.FC<RecipeFormProps> = ({
  onSubmit,
  onCancel,
  isLoading = false,
  currentUser,
}) => {
  const [formData, setFormData] = useState<CreateRecipeData>({
    title: '',
    description: '',
    imageUrl: '',
    preparationTime: 30,
    servings: 4,
    difficulty: 'Fácil',
    ingredients: [''],
    instructions: [''],
    tags: [],
  });

  const [newIngredient, setNewIngredient] = useState('');
  const [newInstruction, setNewInstruction] = useState('');
  const [newTag, setNewTag] = useState('');

  const handleInputChange = (field: keyof CreateRecipeData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addIngredient = () => {
    if (newIngredient.trim()) {
      setFormData((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, newIngredient.trim()],
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

  const addInstruction = () => {
    if (newInstruction.trim()) {
      setFormData((prev) => ({
        ...prev,
        instructions: [...prev.instructions, newInstruction.trim()],
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

    // Filtrar ingredientes e instruções vazios
    const filteredData = {
      ...formData,
      ingredients: formData.ingredients.filter((ing) => ing.trim()),
      instructions: formData.instructions.filter((inst) => inst.trim()),
    };

    onSubmit(filteredData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Informações Básicas */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Informações Básicas
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Input
            label="Título da Receita *"
            placeholder="Ex: Bolo de Chocolate Caseiro"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            required
          />

          <Input
            label="URL da Imagem"
            placeholder="https://exemplo.com/imagem.jpg"
            value={formData.imageUrl}
            onChange={(e) => handleInputChange('imageUrl', e.target.value)}
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-foreground mb-2">
            Descrição *
          </label>
          <textarea
            placeholder="Descreva sua receita... O que a torna especial?"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
            className="w-full p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground placeholder-muted-foreground resize-none"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
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
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
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
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Dificuldade *
            </label>
            <select
              value={formData.difficulty}
              onChange={(e) =>
                handleInputChange('difficulty', e.target.value as any)
              }
              className="w-full p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
              required
            >
              <option value="Fácil">Fácil</option>
              <option value="Médio">Médio</option>
              <option value="Difícil">Difícil</option>
            </select>
          </div>
        </div>
      </div>

      {/* Ingredientes */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Ingredientes
        </h2>

        <div className="space-y-4">
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-1">
                <Input
                  placeholder={`Ingrediente ${index + 1}`}
                  value={ingredient}
                  onChange={(e) => {
                    const newIngredients = [...formData.ingredients];
                    newIngredients[index] = e.target.value;
                    handleInputChange('ingredients', newIngredients);
                  }}
                />
              </div>
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-4">
          <Input
            placeholder="Novo ingrediente..."
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
            onKeyPress={(e) =>
              e.key === 'Enter' && (e.preventDefault(), addIngredient())
            }
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

      {/* Modo de Preparo */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Modo de Preparo
        </h2>

        <div className="space-y-4">
          {formData.instructions.map((instruction, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shrink-0 font-semibold text-sm mt-1">
                {index + 1}
              </div>
              <div className="flex-1">
                <textarea
                  placeholder={`Passo ${index + 1}`}
                  value={instruction}
                  onChange={(e) => {
                    const newInstructions = [...formData.instructions];
                    newInstructions[index] = e.target.value;
                    handleInputChange('instructions', newInstructions);
                  }}
                  rows={2}
                  className="w-full p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground placeholder-muted-foreground resize-none"
                />
              </div>
              <button
                type="button"
                onClick={() => removeInstruction(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-4">
          <textarea
            placeholder="Novo passo..."
            value={newInstruction}
            onChange={(e) => setNewInstruction(e.target.value)}
            rows={2}
            className="flex-1 p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground placeholder-muted-foreground resize-none"
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
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">Tags</h2>

        <div className="flex flex-wrap gap-2 mb-4">
          {formData.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium flex items-center gap-1"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:text-primary-dark"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          <Input
            placeholder="Nova tag (ex: Sobremesa, Saudável...)"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) =>
              e.key === 'Enter' && (e.preventDefault(), addTag())
            }
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
        >
          {isLoading ? 'Criando Receita...' : 'Criar Receita'}
        </Button>
      </div>
    </form>
  );
};
