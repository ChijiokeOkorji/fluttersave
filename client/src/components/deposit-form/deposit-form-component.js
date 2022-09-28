import { useCallback, useMemo, useState } from "react";
// import { Navigate } from 'react-router-dom';
import axios from 'axios';

import { isAmountValid } from "../../logic/input-validate";

import { Loading } from "../loading";
import { Form } from "../form";
import { InputField } from "../input-field";
import { Button } from "../button";

const DepositForm = () => {
  const [amount, setAmount] = useState('');

  const [validateAmount, setValidateAmount] = useState({
    shouldValidate: false,
    validationLogic: isAmountValid,
    isValid: isAmountValid(amount)
  });

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = useCallback((dataFromChild) => {
    for (let key in dataFromChild) {
      setAmount(dataFromChild[key]);

      setValidateAmount(prevValid => ({...prevValid, isValid: prevValid.validationLogic(dataFromChild[key])}));
    }
  }, []);

  const setShouldValidate = useCallback(() => {
    setValidateAmount(prev => {
      if (prev.shouldValidate === false) {
        return ({...prev, shouldValidate: true});
      }

      return prev;
    });
  }, []);

  const disableButton = useMemo(() => {
    if (!(validateAmount.isValid)) {
      return true;
    }

    return false
  }, [validateAmount]);

  // const [shouldRedirect, setShouldRedirect] = useState(false);

  async function handleSignup() {
    try {
      setIsLoading(true);

      const data = await axios.post('/fluttersave/deposit', {
        fullName: 'John Doe',
        toEmail: 'johndoe@anonymous.com',
        mobileNumber: '(+234) 1234567890',
        depositAmount: '5000'
      });
  
      console.log('Received: ', data);

      // dispatch(login(data.data));

      // navigate(redirect || "/home");
    } catch(err) {
      setIsLoading(false);

      // setServerError(err.response.data.message);

      setTimeout(() => {
        setServerError('');
      }, 2000);
    }
  }

  return (
    <Form title="Card Deposit" onSubmit={handleSignup} popup={serverError}>
      <InputField type="amount" placeHolder="Amount" value={amount} onChange={handleChange} validateInput={validateAmount} setShouldValidate={setShouldValidate} errorMessage="Please enter a valid amount" />

      <Button label="Deposit" disabled={disableButton} />

      {isLoading &&
        <Loading />
      }
    </Form>
  );
};

export { DepositForm };
