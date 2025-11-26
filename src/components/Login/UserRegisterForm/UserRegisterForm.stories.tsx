// src/components/LoginForm/LoginForm.stories.tsx
import { AuthContext } from '@/context/AuthContext';
import type { Meta, StoryObj } from '@storybook/react';
import UserRegisterForm from './UserRegisterForm';

const meta: Meta<typeof UserRegisterForm> = {
  title: 'Organisms/UserRegisterForm',
  component: UserRegisterForm,
  tags: ['autodocs'],
  argTypes: {
    onRegisterSuccess: { action: 'Navegar para registro' },
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
type Story = StoryObj<typeof UserRegisterForm>;

export const Default: Story = {
  args: {
    // onSucces e onNavigateToRegister já estão definidos via argTypes
  },
  render: (args) => {
    return (
      <AuthContext.Provider value={defaultAuthContext}>
        <div className="w-full max-w-sm max-h-[90vh] mx-auto p-4 border rounded-lg">
          <UserRegisterForm
            {...args}
          />
        </div>
      </AuthContext.Provider>
    );
  },
};

export const SimulatedError: Story = {
  render: (args) => {
    // Renderiza o LoginForm e simula um erro
    return (
      <AuthContext.Provider value={defaultAuthContext}>

        <div className="w-full max-w-sm max-h-[90vh] mx-auto p-4 border rounded-lg">
          <UserRegisterForm
            {...args}
          // A simulação de erro depende da lógica interna do LoginForm
          // (e do state `error` que ele gerencia)
          // Para o Storybook, mostramos apenas o componente
          />
          <p className="mt-4 text-center text-sm text-red-500">
            *O erro exibido após uma tentativa de login simulada.
          </p>
        </div>
      </AuthContext.Provider>
    );
  },
};
