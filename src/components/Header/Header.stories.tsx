import { AuthContext } from '@/context/AuthContext';
import type { Meta, StoryObj } from '@storybook/react';

import Header from './Header';

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockLogout = () => {};
const mockLogin = async () => ({ success: true, message: 'Success' });
const mockRegister = async () => ({ success: true, message: 'Success', user: undefined });

const defaultAuthContext = {
  user: null,
  isAuthenticated: false,
  login: mockLogin,
  logout: mockLogout,
  register: mockRegister,
  isLoading: false,
};

export const LoggedOut: Story = {
  decorators: [
    (Story) => (
      <AuthContext.Provider value={defaultAuthContext}>
        <Story />
      </AuthContext.Provider>
    ),
  ],
};

export const LoggedIn: Story = {
  decorators: [
    (Story) => (
      <AuthContext.Provider
        value={{
          ...defaultAuthContext,
          user: {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            passwordHash: 'hash',
          },
          isAuthenticated: true,
        }}
      >
        <Story />
      </AuthContext.Provider>
    ),
  ],
};

export const DarkMode: Story = {
  decorators: [
    (Story) => {

      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', 'dark');
      }
      return (
        <AuthContext.Provider value={defaultAuthContext}>
          <Story />
        </AuthContext.Provider>
      );
    },
  ],
};