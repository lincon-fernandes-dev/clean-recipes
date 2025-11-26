import type { Meta, StoryObj } from '@storybook/react';

import Dialog from './DialogBase';

const meta = {
  title: 'Components/Templates/Dialog/DialogBase',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    isOpen: true,
    onClose: () => { },
    children: <div>Dialog Content</div>,
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Dialog Title',
  },
};

export const Large: Story = {
  args: {
    title: 'Large Dialog',
    size: 'lg',
    children: <div className="h-64">Large Content</div>,
  },
};
