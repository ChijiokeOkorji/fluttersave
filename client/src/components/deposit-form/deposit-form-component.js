import { useCallback, useMemo, useState } from "react";
import { Navigate } from 'react-router-dom';
import axios from 'axios';

import { isAmountValid } from "../../logic/input-validate";

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
    // console.log(amount);
    // console.log('User has logged in');
    // setShouldRedirect(true);

    const data = await axios.post('/deposit', {
      fullName: "John Doe",
      mobileNumber: "(+234) 9012345678",
      toEmail: "johndoe@anonymous.com",
      depositAmount: "50000"
    });

    console.log(data);
  }

  return (
    <Form title="Card Deposit" onSubmit={handleSignup}>
      <InputField type="amount" placeHolder="Amount" value={amount} onChange={handleChange} validateInput={validateAmount} setShouldValidate={setShouldValidate} errorMessage="Please enter a valid amount" />

      <Button label="Deposit" onClick={handleSignup} disabled={disableButton} />

      {/* {shouldRedirect &&
        <Navigate to="/deposit/modal" />
      } */}
    </Form>
  );
};

export { DepositForm };
