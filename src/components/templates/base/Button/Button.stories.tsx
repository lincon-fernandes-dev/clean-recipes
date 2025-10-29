// src/components/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Plus } from 'lucide-react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Base/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    isDisabled: {
      control: 'boolean',
    },
    icon: {
      control: false, // O Storybook não lida bem com componentes como props, mas vamos usar nas stories
    },
    isLoading: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Salvar Receita',
    isLoading: false,
  },
};

export const SecondaryWithIcon: Story = {
  args: {
    variant: 'secondary',
    children: 'Adicionar',
    icon: Plus,
    iconPosition: 'left',
    isLoading: false,
  },
};

export const LargeWithLoading: Story = {
  args: {
    variant: 'primary',
    children: 'Salvar Receita',
    size: 'large',
    isLoading: true,
  },
};
export const MediumDisabled: Story = {
  args: {
    variant: 'primary',
    children: 'Salvar Receita',
    size: 'large',
    isLoading: false,
    isDisabled: true,
  },
};

export const SmallDanger: Story = {
  args: {
    variant: 'danger',
    children: 'Excluir',
    size: 'small',
    isLoading: false,
  },
};
