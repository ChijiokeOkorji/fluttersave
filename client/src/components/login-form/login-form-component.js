import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from '../../store/user';

import axios from 'axios';

import { isEmailValid, isValueEntered } from "../../logic/input-validate";

import { Loading } from "../loading";
import { Form } from "../form";
import { InputField } from "../input-field";
import { Button } from "../button";

const LoginForm = ({ redirect }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');

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

    return false;
  }, [validateInput]);

  async function handleSubmit() {
    try {
      setIsLoading(true);

      const response = await axios.post('/fluttersave/login', {...loginData});

      dispatch(login(response.data));

      navigate(redirect || "/home");
    } catch(err) {
      setIsLoading(false);

      setServerError(err.response.data.message);

      setTimeout(() => {
        setServerError('');
      }, 2000);
    }
  }

  return (
    <Form title="Sign In" onSubmit={handleSubmit} popup={serverError}>
      <InputField placeHolder="Email" value={loginData.email} onChange={handleChange} validateInput={validateInput.email} setShouldValidate={setShouldValidate} errorMessage="Please enter a valid email address" />
      <InputField type="password" placeHolder="Password" value={loginData.confirmPassword} onChange={handleChange} validateInput={validateInput.password} setShouldValidate={setShouldValidate} showPassword={showPassword} setShowPassword={setShowPassword} errorMessage="Password cannot be blank" />

      <Button label="Login" disabled={disableButton} />

      {isLoading &&
        <Loading />
      }
    </Form>
  );
};

export { LoginForm };
