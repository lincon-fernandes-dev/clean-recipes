import type { Meta, StoryObj } from '@storybook/react';
import { Users } from 'lucide-react';
import StatsCard from './StatusCard';

const meta = {
  title: 'Components/StatusCard',
  component: StatsCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StatsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <Users className="w-5 h-5" />,
    label: 'Users',
    value: '1.2K',
  },
};
