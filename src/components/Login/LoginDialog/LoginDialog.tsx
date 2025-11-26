'use client';

import { useState } from 'react';
import Button from '../../templates/base/Button/Button';
import Dialog from '../../templates/dialog/DialogBase';
import LoginForm from '../LoginForm/LoginForm';
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
      title="Login"
    >
      {registerDialog ? (
        <UserRegisterForm onRegisterSuccess={handleRegisterSuccess} />
      ) : (
        <LoginForm onLoginSucess={handleLoginSuccess} />
      )}
      {registerDialog ? (
        <RedirectToLoginForm
          handleUpdateLoginDialog={handleUpdateRegisterDialog}
        />
      ) : (
        <RedirectToRegisterForm
          handleUpdateRegisterDialog={handleUpdateRegisterDialog}
        />
      )}
    </Dialog>
  );
};

export default LoginDialog;

export interface RedirectToLoginFormProps {
  handleUpdateLoginDialog: () => void;
}
const RedirectToLoginForm: React.FC<RedirectToLoginFormProps> = ({
  handleUpdateLoginDialog,
}) => {
  return (
    <div className="flex flex-row md:flex-col align-middle items-center justify-center gap-2 text-center pt-4 border-t border-border/50">
      <p className="text-sm text-muted-foreground">
        Já tem uma conta?{' '}
        <Button
          type="button"
          className="text-primary hover:text-primary-dark font-semibold transition-colors duration-200 hover:underline"
          onClick={handleUpdateLoginDialog}
        >
          Faça login aqui
        </Button>
      </p>
    </div>
  );
};
export interface RedirectToRegisterFormProps {
  handleUpdateRegisterDialog: () => void;
}
const RedirectToRegisterForm: React.FC<RedirectToRegisterFormProps> = ({
  handleUpdateRegisterDialog,
}) => {
  return (
    <div className="text-center pt-4 border-t border-border/50 flex justify-center gap-2 items-center">
      <p className="text-sm text-muted-foreground">Novo por aqui? </p>
      <Button type="button" size="small" onClick={handleUpdateRegisterDialog}>
        Crie sua conta gourmet
      </Button>
    </div>
  );
};
