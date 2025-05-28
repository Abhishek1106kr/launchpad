import { useAuth } from '../../context/AuthContext';
import StartupAuthForm from '../../components/startup/StartupAuthForm';

const LoginPage = () => {
  const { login, isLoading } = useAuth();

  const handleLogin = async (data: { email: string; password: string }) => {
    await login(data.email, data.password);
  };

  return (
    <StartupAuthForm
      type="login"
      onSubmit={handleLogin}
      isLoading={isLoading}
    />
  );
};

export default LoginPage;