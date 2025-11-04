// src/components/LoginForm/LoginForm.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import UserRegisterForm from './UserRegisterForm';

const meta: Meta<typeof UserRegisterForm> = {
  title: 'Organisms/LoginForm',
  component: UserRegisterForm,
  tags: ['autodocs'],
  argTypes: {
    onRegisterSuccess: { action: 'Navegar para registro' },
  },
};

export default meta;
type Story = StoryObj<typeof UserRegisterForm>;

export const Default: Story = {
  args: {
    // onSucces e onNavigateToRegister já estão definidos via argTypes
  },
};

export const SimulatedError: Story = {
  render: (args) => {
    // Renderiza o LoginForm e simula um erro
    return (
      <div className="w-full max-w-sm mx-auto p-4 border rounded-lg">
        <UserRegisterForm
          {...args}
          // A simulação de erro depende da lógica interna do LoginForm
          // (e do state `error` que ele gerencia)
          // Para o Storybook, mostramos apenas o componente
        />
        <p className="mt-4 text-center text-sm text-red-500">
          *O erro acima seria exibido após uma tentativa de login simulada.
        </p>
      </div>
    );
  },
};
