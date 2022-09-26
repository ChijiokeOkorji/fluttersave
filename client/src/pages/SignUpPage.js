import { Main } from '../components/main';
import { SignUpForm } from '../components/sign-up-form';
import { SwitchAuthenticationBar } from '../components/switch-auth-bar';

const SignUpPage = () => {
  return (
    <Main align="center">
      <SignUpForm />

      <SwitchAuthenticationBar redirectTo="/login" message="Already have an account?" buttonLabel = 'Login'  />
    </Main>
  );
};

export default SignUpPage;
