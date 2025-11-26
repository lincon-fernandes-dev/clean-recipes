import { AuthContext } from '@/context/AuthContext';
import type { Meta, StoryObj } from '@storybook/react';

import LoginDialog from './LoginDialog';

const meta = {
  title: 'Components/Login/LoginDialog',
  component: LoginDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    isOpen: true,
    onClose: () => { },
  },
} satisfies Meta<typeof LoginDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockLogout = () => { };
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

export const Default: Story = {
  decorators: [
    (Story) => {

      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', 'light');
      }
      return (
        <AuthContext.Provider value={defaultAuthContext}>
          <Story />
        </AuthContext.Provider>
      )
    },
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
      )
    },
  ],
};