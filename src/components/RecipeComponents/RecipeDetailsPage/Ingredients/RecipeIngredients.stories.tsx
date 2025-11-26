import type { Meta, StoryObj } from '@storybook/react';
import RecipeIngredientsComponent from './RecipeIngredients';

const meta = {
  title: 'Components/RecipeComponents/RecipeDetailsPage/Ingredients',
  component: RecipeIngredientsComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RecipeIngredientsComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockRecipe = {
  ingredients: [
    { id: 1, name: '2 cups of flour' },
    { id: 2, name: '1 cup of sugar' },
    { id: 3, name: '3 eggs' },
  ],
};

export const Default: Story = {
  args: {
    recipe: mockRecipe as any,
  },
};
