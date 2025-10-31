import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Button from '../Button/Button'; // Reutilizando seu Button
import Modal from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Templates/Base/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    // Isso garante que o modal seja visualizado corretamente no Storybook
    layout: 'fullscreen',
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
    },
    onClose: {
      action: 'onClose executado',
    },
    children: {
      control: false,
    },
  },
};

export default meta;

const ModalTemplate: StoryObj<typeof Modal> = {
  render: (args) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(args.isOpen);

    const handleOpen = () => setIsModalOpen(true);
    const handleClose = () => {
      setIsModalOpen(false);
      args.onClose();
    };

    return (
      <div className="p-10 min-h-screen bg-gray-50 flex items-center justify-center">
        <Button onClick={handleOpen}>Abrir Modal</Button>
        <Modal {...args} isOpen={isModalOpen} onClose={handleClose}>
          {args.children}
        </Modal>
      </div>
    );
  },
};

export const DefaultModal = {
  ...ModalTemplate,
  args: {
    isOpen: false, // Começa fechado na simulação
    title: 'Aviso Importante',
    children: (
      <div>
        <p className="text-gray-700 mb-4">
          Você pode usar este Modal para exibir confirmações, formulários ou
          mensagens.
        </p>
        <Button
          variant="secondary"
          onClick={() => console.log('Ação confirmada')}
        >
          Confirmar Ação
        </Button>
      </div>
    ),
  },
};
