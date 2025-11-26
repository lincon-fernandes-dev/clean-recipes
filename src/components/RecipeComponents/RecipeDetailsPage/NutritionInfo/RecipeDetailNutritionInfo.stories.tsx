import type { Meta, StoryObj } from '@storybook/react';
import RecipeDetailNutritionInfoComponent from './RecipeDetailNutritionInfo';

const meta = {
  title: 'Components/RecipeComponents/RecipeDetailsPage/NutritionInfo',
  component: RecipeDetailNutritionInfoComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RecipeDetailNutritionInfoComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockNutritionInfo = {
  calories: 250,
  proteins: 5,
  carbs: 30,
  fat: 12,
};

export const Default: Story = {
  args: {
    nutritionInfo: mockNutritionInfo,
  },
};
