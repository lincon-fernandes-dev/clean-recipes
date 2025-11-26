import type { Meta, StoryObj } from '@storybook/react';
import RecipeInstructionsComponent from './RecipeInstructionsComponent';

const meta = {
  title: 'Components/RecipeComponents/RecipeDetailsPage/Instructions',
  component: RecipeInstructionsComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RecipeInstructionsComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockRecipe = {
  instructions: [
    { id: 1, stepNumber: 1, content: 'Preheat the oven to 350°F (175°C).' },
    { id: 2, stepNumber: 2, content: 'Mix the dry ingredients.' },
    { id: 3, stepNumber: 3, content: 'Add the wet ingredients and mix well.' },
    { id: 4, stepNumber: 4, content: 'Bake for 30 minutes.' },
  ],
};

export const Default: Story = {
  args: {
    recipe: mockRecipe as any,
  },
};
