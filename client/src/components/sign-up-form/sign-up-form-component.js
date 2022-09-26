import { useCallback, useMemo, useState } from "react";

import { isNameValid, isEmailValid, isPhoneNumberValid, isValueEntered, doesItMatch } from "../../logic/input-validate";

import { Form } from "../form";
import { InputField } from "../input-field";
import { Button } from "../button";

const SignUpForm = () => {
  const [newUserData, setNewUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const [validateInput, setValidateInput] = useState({
    firstName: {
      shouldValidate: false,
      validationLogic: isNameValid,
      isValid: isNameValid(newUserData.firstName)
    },
    lastName: {
      shouldValidate: false,
      validationLogic: isNameValid,
      isValid: isNameValid(newUserData.lastName)
    },
    email: {
      shouldValidate: false,
      validationLogic: isEmailValid,
      isValid: isEmailValid(newUserData.email)
    },
    phoneNumber: {
      shouldValidate: false,
      validationLogic: isPhoneNumberValid,
      isValid: isPhoneNumberValid(newUserData.phoneNumber)
    },
    confirmPassword: {
      shouldValidate: false,
      validationLogic: (input1, input2) => {
        return isValueEntered(input1) && doesItMatch(input1, input2);
      },
      isValid: isValueEntered(newUserData.confirmPassword) && doesItMatch(newUserData.password, newUserData.confirmPassword)
    }
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = useCallback((dataFromChild) => {
    setNewUserData(prevUser => {
      for (let key in dataFromChild) {
        if ((/password|confirmPassword/).test(key)) {
          setValidateInput(prevValid => ({...prevValid, confirmPassword: {...prevValid.confirmPassword, isValid: prevValid.confirmPassword.validationLogic(dataFromChild[key], `${((/password/).test(key)) ? prevUser.confirmPassword : prevUser.password}`)}}));
        } else {
          setValidateInput(prevValid => ({...prevValid, [key]: {...prevValid[key], isValid: prevValid[key].validationLogic(dataFromChild[key])}}));
        }
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
    console.log(newUserData);
    console.log('User account has been created');
  }

  return (
    <Form title="Create Account" onSubmit={handleSignup}>
      <InputField placeHolder="First Name" value={newUserData.firstName} onChange={handleChange} validateInput={validateInput.firstName} setShouldValidate={setShouldValidate} errorMessage="Please enter a valid first name" />
      <InputField placeHolder="Last Name" value={newUserData.lastName} onChange={handleChange} validateInput={validateInput.lastName} setShouldValidate={setShouldValidate} errorMessage="Please enter a valid last name" />
      <InputField placeHolder="Email" value={newUserData.email} onChange={handleChange} validateInput={validateInput.email} setShouldValidate={setShouldValidate} errorMessage="Please enter a valid email address" />
      <InputField type="tel" placeHolder="Phone Number" value={newUserData.phoneNumber} onChange={handleChange} validateInput={validateInput.phoneNumber} setShouldValidate={setShouldValidate} errorMessage="Please enter a valid phone number" />
      <InputField type="password" placeHolder="Password" value={newUserData.password} onChange={handleChange} validateInput={validateInput.confirmPassword} showPassword={showPassword} setShowPassword={setShowPassword} />
      <InputField type="password" placeHolder="Confirm Password" value={newUserData.confirmPassword} onChange={handleChange} validateInput={validateInput.confirmPassword} setShouldValidate={setShouldValidate} showPassword={showPassword} setShowPassword={setShowPassword} errorMessage="Passwords must be valid, and must match" />

      <Button label="Sign Up" onClick={handleSignup} disabled={disableButton} />
    </Form>
  );
};

export { SignUpForm };
