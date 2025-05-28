import { useAuth } from '../../context/AuthContext';
import StartupRegistrationForm from '../../components/startup/StartupRegistrationForm';

const RegisterPage = () => {
  const { register, isLoading } = useAuth();

  const handleRegister = async (data: any) => {
    await register(data);
  };

  return (
    <StartupRegistrationForm
      onSubmit={handleRegister}
      isLoading={isLoading}
    />
  );
};

export default RegisterPage;