import type { Meta, StoryObj } from '@storybook/react';
import { RecipesEmptyState } from './RecipesEmptyState';

const meta = {
  title: 'Components/RecipeComponents/RecipesEmptyState',
  component: RecipesEmptyState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RecipesEmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoResults: Story = {
  args: {
    type: 'no-results',
  },
};

export const NoRecipes: Story = {
  args: {
    type: 'no-recipes',
  },
};
