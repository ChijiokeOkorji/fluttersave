import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Main } from '../components/main';
import { SignUpForm } from '../components/sign-up-form';
import { SwitchAuthenticationBar } from '../components/switch-auth-bar';

const SignUpPage = () => {
  const storeData = useSelector(state => state.user);

  return (
    <Main align="center">
      {storeData.Email ? <Navigate to="/home" /> : null}

      <SignUpForm />

      <SwitchAuthenticationBar redirectTo="/login" message="Already have an account?" buttonLabel = 'Login'  />
    </Main>
  );
};

export default SignUpPage;
