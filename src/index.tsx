import { AuthProvider } from './contexts/AuthContext';
import AppRouter from './AppRouter';
import { Toaster } from 'sonner';

export default function Root() {
  return (
    <AuthProvider>
      <AppRouter />
      <Toaster position="top-right" richColors />
    </AuthProvider>
  );
}
