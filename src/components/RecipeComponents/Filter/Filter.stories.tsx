import type { Meta, StoryObj } from '@storybook/react';

import FilterSection from './Filter';

const meta = {
  title: 'Components/RecipeComponents/Filter',
  component: FilterSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onSearchChange: () => {},
    onFilterChange: () => {},
  },
} satisfies Meta<typeof FilterSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    search: '',
    selectedFilter: 'all',
  },
};

export const WithSearch: Story = {
  args: {
    search: 'Bolo',
    selectedFilter: 'all',
  },
};

export const WithFilterSelected: Story = {
  args: {
    search: '',
    selectedFilter: 'dessert',
  },
};
