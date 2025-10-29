// src/components/Badge/Badge.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Clock, Heart, Zap } from 'lucide-react';
import Badge from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Base/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['success', 'warning', 'info', 'primary'],
    },
    icon: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const InfoBadge: Story = {
  args: {
    children: 'Fácil',
    variant: 'info',
  },
};

export const TimeBadge: Story = {
  args: {
    children: '30 Minutos',
    variant: 'warning',
    icon: Clock,
  },
};

export const SuccessBadge: Story = {
  args: {
    children: 'Vegano',
    variant: 'success',
    icon: Heart,
  },
};

export const PrimaryBadge: Story = {
  args: {
    children: 'Popular',
    variant: 'primary',
    icon: Zap,
  },
};
