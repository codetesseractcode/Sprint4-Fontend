import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  error: string | null;
  onClearError: () => void;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children, error, onClearError }) => {
  if (error) {
    return (
      <div className="error-container">
        <h3>Something went wrong!</h3>
        <p>{error}</p>
        <button 
          onClick={onClearError}
          className="error-clear-button"
        >
          Clear Error
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;
