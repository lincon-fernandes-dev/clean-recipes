// src/components/Card/Card.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ChefHat } from 'lucide-react';
import Card from './Card';

const meta: Meta<typeof Card> = {
  title: 'Base/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    shadow: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
    padding: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    isClickable: {
      control: 'boolean',
    },
    children: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

const CardContent = (
  <div className="flex items-center space-x-4">
    <ChefHat className="w-10 h-10 text-orange-500" />
    <div>
      <h3 className="text-lg font-bold">Título do Card</h3>
      <p className="text-sm text-gray-600">
        Este é um contêiner básico para agrupar conteúdo.
      </p>
    </div>
  </div>
);

export const DefaultCard: Story = {
  args: {
    children: CardContent,
    shadow: 'md',
  },
};

export const ClickableCard: Story = {
  args: {
    children: CardContent,
    shadow: 'lg',
    isClickable: true,
  },
};

export const SmallPaddingCard: Story = {
  args: {
    children: CardContent,
    padding: 'sm',
  },
};
