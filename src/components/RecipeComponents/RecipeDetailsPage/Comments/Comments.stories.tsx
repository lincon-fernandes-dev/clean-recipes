import type { Meta, StoryObj } from '@storybook/react';

import Comments from './Comments';

const meta = {
  title: 'Components/RecipeComponents/RecipeDetailsPage/Comments',
  component: Comments,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onAddComment: () => {},
  },
} satisfies Meta<typeof Comments>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockAuthor = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  passwordHash: 'hash',
  avatar: 'https://placehold.co/100',
  isVerified: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockComments = [
  {
    idComment: 1,
    content: 'This is a great recipe!',
    author: mockAuthor,
    createdAt: new Date(),
    likes: 5,
    isCommentLiked: false,
    replies: [],
    hasReplies: () => false,
  },
  {
    idComment: 2,
    content: 'I loved it!',
    author: { ...mockAuthor, name: 'Jane Doe', id: 2 },
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
    likes: 10,
    isCommentLiked: true,
    replies: [
      {
        idComment: 3,
        content: 'Me too!',
        author: mockAuthor,
        createdAt: new Date(),
        likes: 2,
        isCommentLiked: false,
        replies: [],
        hasReplies: () => false,
      },
    ],
    hasReplies: () => true,
  },
];

export const Default: Story = {
  args: {
    comments: mockComments as any, // Casting because Comment entity has methods that are hard to mock perfectly in plain object
    currentUserId: 1,
  },
};

export const Empty: Story = {
  args: {
    comments: [],
    currentUserId: 1,
  },
};

export const NotLoggedIn: Story = {
  args: {
    comments: mockComments as any,
    currentUserId: undefined,
  },
};
