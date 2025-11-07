import { useAuth } from '@/context/AuthContext';
import { ChefHat, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import * as React from 'react';
import { useState } from 'react';
import Button from '../templates/base/Button/Button';
import Input from '../templates/form/Input/Input';

export interface ILoginFormProps {
  onLoginSucess: () => void;
}

const LoginForm: React.FC<ILoginFormProps> = ({ onLoginSucess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validação básica
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      setIsLoading(false);
      return;
    }

    try {
      const result = await login(email, password);

      if (!result.success) {
        setError(result.message);
      } else {
        onLoginSucess();
      }
    } catch (error) {
      setError('Erro durante o login. Tente novamente.' + error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center">
        <div className="flex justify-center mb-3">
          <div className="w-12 h-12 bg-linear-to-br from-primary to-accent rounded-xl flex items-center justify-center">
            <ChefHat className="w-6 h-6 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-foreground ">
          Entre na Sua Cozinha
        </h2>
        <p className="text-muted-foreground mt-2">
          Digite suas credenciais para acessar sua conta
        </p>
      </div>
      <div className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="seu@email.com"
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
        <Input
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          icon={Lock}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
          error={error || undefined}
          endAdornment={
            <Button
              type="button"
              size="small"
              onClick={togglePasswordVisibility}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200 p-1"
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </Button>
          }
        />
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => console.log('Esqueci senha clicado')}
          className="text-sm text-primary hover:text-primary-dark font-medium transition-colors duration-200"
          disabled={isLoading}
        >
          Esqueceu sua senha?
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-700 text-sm flex items-center">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
            {error}
          </p>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="large"
        isLoading={isLoading}
        isDisabled={isLoading}
        className="w-full bg-linear-to-r from-primary to-accent hover:from-primary-dark hover:to-accent-dark shadow-lg hover:shadow-xl transition-all duration-200 font-semibold"
      >
        {isLoading ? 'Entrando...' : 'Entrar na Cozinha'}
      </Button>

      <div className="relative flex items-center py-4">
        <div className="grow border-t border-border/50"></div>
        <span className="shrink mx-4 text-muted-foreground text-sm">ou</span>
        <div className="grow border-t border-border/50"></div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          size="medium"
          onClick={() => console.log('Login com Google')}
          disabled={true}
          className="w-full border-border hover:bg-card transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google
        </Button>

        <Button
          type="button"
          variant="outline"
          size="medium"
          onClick={() => console.log('Login com Facebook')}
          disabled={true}
          className="w-full border-border hover:bg-card transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="#1877F2" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Facebook
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
