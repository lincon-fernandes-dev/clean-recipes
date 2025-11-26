import type { Meta, StoryObj } from '@storybook/react';

import RecipeCard from './RecipeCard';

const meta = {
  title: 'Components/RecipeComponents/RecipeCard',
  component: RecipeCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onVote: () => {},
    onComment: () => {},
    onEdit: () => {},
  },
} satisfies Meta<typeof RecipeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockRecipe = {
  idRecipe: '1',
  title: 'Bolo de Chocolate',
  description: 'Um bolo delicioso',
  imageUrl: 'https://placehold.co/600x400',
  author: {
    id: 1,
    name: 'Chef John',
    email: 'john@example.com',
    passwordHash: 'hash',
    avatar: 'https://placehold.co/100',
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  preparationTime: 45,
  servings: 8,
  difficulty: 'Fácil' as const,
  ingredients: [],
  instructions: [],
  tags: ['Doce', 'Bolo'],
  votes: 10,
  comments: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const Default: Story = {
  args: {
    recipe: mockRecipe,
  },
};

export const Difficult: Story = {
  args: {
    recipe: {
      ...mockRecipe,
      difficulty: 'Difícil',
      votes: 120,
    },
  },
};
