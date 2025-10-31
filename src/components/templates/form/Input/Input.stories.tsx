// src/components/Input/Input.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Search, User } from 'lucide-react';
import Input from './Input';

const meta: Meta<typeof Input> = {
  title: 'Base/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: false,
    },
    error: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: 'Nome da Receita',
    placeholder: 'Ex: Bolo de Cenoura',
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Buscar Receita',
    placeholder: 'Busque por ingredientes ou nome...',
    icon: Search,
    type: 'search',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'seu@email.com',
    type: 'email',
    error: 'Email inválido. Por favor, verifique o formato.',
    icon: User,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Ingredientes (desativado)',
    defaultValue: 'Farinha, Ovos, Leite',
    disabled: true,
  },
};
