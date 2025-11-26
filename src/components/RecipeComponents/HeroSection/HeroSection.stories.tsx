import type { Meta, StoryObj } from '@storybook/react';
import { HeroSection } from './HeroSection';

const meta = {
  title: 'Components/RecipeComponents/HeroSection',
  component: HeroSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HeroSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Descubra Receitas ',
    highlightText: 'Incríveis',
    subtitle: 'Explore milhares de receitas deliciosas compartilhadas por nossa comunidade.',
  },
};
