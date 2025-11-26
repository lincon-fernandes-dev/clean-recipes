import type { Meta, StoryObj } from '@storybook/react';
import { RecipeResultsHeader } from './RecipeResultsHeader';

const meta = {
  title: 'Components/RecipeComponents/RecipeResultsHeader',
  component: RecipeResultsHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RecipeResultsHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedFilter: 'all',
    resultCount: 12,
  },
};

export const WithSearch: Story = {
  args: {
    selectedFilter: 'all',
    resultCount: 5,
    searchQuery: 'Chocolate',
  },
};

export const Popular: Story = {
  args: {
    selectedFilter: 'popular',
    resultCount: 20,
  },
};
