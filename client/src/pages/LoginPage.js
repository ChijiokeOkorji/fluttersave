import { Main } from '../components/main';
import { LoginForm } from '../components/login-form';
import { SwitchAuthenticationBar } from '../components/switch-auth-bar';

const LoginPage = () => {
  return (
    <Main align="center">
      <LoginForm />

      <SwitchAuthenticationBar redirectTo="/" message="Don't have an account?" buttonLabel = 'Sign Up'  />
    </Main>
  );
};

export default LoginPage;
