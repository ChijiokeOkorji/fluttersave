import { useCallback, useMemo, useState } from "react";
// import { Navigate } from 'react-router-dom';

import { isEmailValid, isValueEntered } from "../../logic/input-validate";

import { Form } from "../form";
import { InputField } from "../input-field";
import { Button } from "../button";

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [validateInput, setValidateInput] = useState({
    email: {
      shouldValidate: false,
      validationLogic: isEmailValid,
      isValid: isEmailValid(loginData.email)
    },
    password: {
      shouldValidate: false,
      validationLogic: isValueEntered,
      isValid: isValueEntered(loginData.password)
    }
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = useCallback((dataFromChild) => {
    setLoginData(prevUser => {
      for (let key in dataFromChild) {
        setValidateInput(prevValid => ({...prevValid, [key]: {...prevValid[key], isValid: prevValid[key].validationLogic(dataFromChild[key])}}));
      }

      return ({...prevUser, ...dataFromChild});
    });
  }, []);

  const setShouldValidate = useCallback((dataFromChild) => {
    setValidateInput(prev => {
      if (prev[dataFromChild].shouldValidate === false) {
        return ({...prev, [dataFromChild]: {...prev[dataFromChild], shouldValidate: true}});
      }

      return prev;
    });
  }, []);

  const disableButton = useMemo(() => {
    for (let key in validateInput) {
      if (!(validateInput[key].isValid)) {
        return true;
      }
    }

    return false
  }, [validateInput]);

  async function handleSignup() {
    console.log(loginData);
    console.log('User has logged in');
  }

  return (
    <Form title="Sign In" onSubmit={handleSignup}>
      <InputField placeHolder="Email" value={loginData.email} onChange={handleChange} validateInput={validateInput.email} setShouldValidate={setShouldValidate} errorMessage="Please enter a valid email address" />
      <InputField type="password" placeHolder="Password" value={loginData.confirmPassword} onChange={handleChange} validateInput={validateInput.password} setShouldValidate={setShouldValidate} showPassword={showPassword} setShowPassword={setShowPassword} errorMessage="Password cannot be blank" />

      <Button label="Login" onClick={handleSignup} disabled={disableButton} />
    </Form>
  );
};

export { LoginForm };
