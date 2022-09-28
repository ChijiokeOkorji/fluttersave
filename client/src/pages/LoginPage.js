import { useLocation } from 'react-router-dom';

import { Main } from '../components/main';
import { LoginForm } from '../components/login-form';
import { SwitchAuthenticationBar } from '../components/switch-auth-bar';

const LoginPage = () => {
  const location = useLocation();
  const path = location.state?.path;

  return (
    <Main align="center">
      <LoginForm redirect={path} />

      <SwitchAuthenticationBar redirectTo="/" message="Don't have an account?" buttonLabel = 'Sign Up'  />
    </Main>
  );
};

export default LoginPage;
