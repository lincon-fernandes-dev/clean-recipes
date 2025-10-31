'use client';
import { useAuth } from '@/context/AuthContext';
import { Moon, Plus, Sun } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from '../templates/base/Button/Button';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isDark, setIsDark] = useState(false);

  // Verificar preferência do sistema ao carregar
  useEffect(() => {
    const handleDarkModeChange = () => {
      const isDarkMode =
        localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') &&
          window.matchMedia('(prefers-color-scheme: dark)').matches);

      setIsDark(isDarkMode);
      document.documentElement.setAttribute(
        'data-theme',
        isDarkMode ? 'dark' : 'light'
      );
    };
    handleDarkModeChange();
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.setAttribute(
      'data-theme',
      newTheme ? 'dark' : 'light'
    );
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const handleCreateRecipe = () => {
    console.log('Abrir modal/página de criação de nova receita.');
  };

  return (
    <header className="sticky top-0 bg-card border-b border-border shadow-sm backdrop-blur-sm bg-opacity-95 p-4 flex justify-between items-center z-50 transition-colors duration-300">
      <div className="flex items-center space-x-2">
        <Link href="/">
          <h1 className="text-2xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
            RecipeApp
          </h1>
        </Link>
      </div>

      <div className="flex items-center space-x-3">
        <span className="text-sm text-muted-foreground hidden sm:inline dark:text-secondary">
          Bem-vindo(a),{' '}
          <span className="font-medium text-foreground">{user?.email}</span>
        </span>

        <Button
          variant="ghost"
          size="small"
          onClick={toggleTheme}
          className="rounded-full p-2 hover:bg-primary hover:text-white transition-all duration-200 outline-0 dark:text-secondary"
          aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>

        <Button
          variant="primary"
          icon={Plus}
          onClick={handleCreateRecipe}
          className="shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Nova Receita
        </Button>

        <Button
          variant="danger"
          size="small"
          onClick={logout}
          className="hover:scale-105 transition-transform duration-200"
        >
          Sair
        </Button>
      </div>
    </header>
  );
};

export default Header;
