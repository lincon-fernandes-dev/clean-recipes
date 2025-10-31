// src/components/ErrorState/ErrorState.tsx
interface ErrorStateProps {
  title?: string;
  error?: Error | string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Erro ao carregar',
  error,
}) => {
  const errorMessage = error instanceof Error ? error.message : error;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="text-red-500 text-lg mb-2">{title}</div>
        {errorMessage && (
          <div className="text-muted-foreground">{errorMessage}</div>
        )}
      </div>
    </div>
  );
};
