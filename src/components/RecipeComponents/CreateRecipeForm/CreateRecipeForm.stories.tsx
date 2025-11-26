import type { Meta, StoryObj } from '@storybook/react';

import { RecipeForm } from './CreateRecipeForm';

const meta = {
  title: 'Components/RecipeComponents/CreateRecipeForm',
  component: RecipeForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onSubmit: () => {},
    onCancel: () => {},
    uploadImage: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return 'https://placehold.co/600x400';
    },
  },
} satisfies Meta<typeof RecipeForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};
