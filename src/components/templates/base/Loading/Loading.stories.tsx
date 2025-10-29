// src/components/Loading/Loading.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import Loading from './Loading';

const meta: Meta<typeof Loading> = {
  title: 'Base/Loading',
  component: Loading,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    message: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Loading>;

export const Default: Story = {
  args: {
    message: 'Carregando conteúdo...',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const LargeWithMessage: Story = {
  args: {
    size: 'lg',
    message: 'Buscando receitas, por favor aguarde.',
  },
};
