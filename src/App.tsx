import { AuthProvider } from './contexts/AuthContext';
import AppRouter from './AppRouter';
import { Toaster } from 'sonner';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppRouter />
        <Toaster position="top-right" richColors />
      </AuthProvider>
    </ErrorBoundary>
  );
}
