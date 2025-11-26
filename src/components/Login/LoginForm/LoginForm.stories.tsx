// src/components/LoginForm/LoginForm.stories.tsx
import { AuthContext } from '@/context/AuthContext';
import type { Meta, StoryObj } from '@storybook/react';
import LoginForm from './LoginForm';

const meta: Meta<typeof LoginForm> = {
  title: 'Organisms/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
  argTypes: {
    onLoginSucess: { action: 'Login bem-sucedido' },
  },
};
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
export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
  args: {
  },
  render: (args) => {
    return (
      <AuthContext.Provider value={defaultAuthContext}>
        <div className="w-full max-w-sm mx-auto p-4 border rounded-lg">
          <LoginForm
            {...args}
          />
        </div>
      </AuthContext.Provider>
    );
  },
};