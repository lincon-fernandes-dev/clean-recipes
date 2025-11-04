// src/components/LoginDialog/LoginDialog.tsx
'use client';

import { useState } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import Button from '../templates/base/Button/Button';
import Dialog from '../templates/dialog/DialogBase';
import UserRegisterForm from '../UserRegisterForm/UserRegisterForm';

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ isOpen, onClose }) => {
  const [registerDialog, setRegisterDialog] = useState(true);
  const handleLoginSuccess = () => {
    onClose();
  };
  const handleRegisterSuccess = () => {
    onClose();
  };
  const handleUpdateRegisterDialog = () => {
    setRegisterDialog(!registerDialog);
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      showCloseButton={true}
      closeOnBackdropClick={true}
    >
      {registerDialog ? (
        <LoginForm onLoginSucess={handleLoginSuccess} />
      ) : (
        <UserRegisterForm onRegisterSuccess={handleRegisterSuccess} />
      )}
      <div className="text-center pt-4 border-t border-border/50 flex justify-center gap-2 items-center">
        <p className="text-sm text-muted-foreground">Novo por aqui? </p>
        <Button type="button" size="small" onClick={handleUpdateRegisterDialog}>
          Crie sua conta gourmet
        </Button>
      </div>
    </Dialog>
  );
};

export default LoginDialog;
