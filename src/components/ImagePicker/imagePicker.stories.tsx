import type { Meta, StoryObj } from '@storybook/react';

import ImagePicker from './imagePicker';

const meta = {
  title: 'Components/ImagePicker',
  component: ImagePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onImageSelect: () => {},
  },
} satisfies Meta<typeof ImagePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Upload Image',
    name: 'image',
  },
};

export const WithSelectedImage: Story = {
  args: {
    label: 'Change Image',
    name: 'image',
    selectedImage: 'https://placehold.co/600x400',
  },
};

export const NoLabel: Story = {
  args: {
    label: '',
    name: 'image',
  },
};
