import type { Meta, StoryObj } from '@storybook/react';
import { ErrorState } from './ErrorState';

const meta = {
  title: 'Components/Templates/Base/ErrorState',
  component: ErrorState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ErrorState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    error: 'Something went wrong',
  },
};

export const CustomTitle: Story = {
  args: {
    title: 'Custom Error Title',
    error: 'Detailed error message',
  },
};
