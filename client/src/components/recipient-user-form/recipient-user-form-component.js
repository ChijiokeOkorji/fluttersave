import { useCallback, useMemo, useState } from "react";

import { isAmountValid, isEmailValid } from "../../logic/input-validate";

import { Form } from "../form";
import { InputField } from "../input-field";
import { Button } from "../button";

const RecipientUserForm = () => {
  const [recipientData, setRecipientData] = useState({
    amount: '',
    email: ''
  });

  const [validateInput, setValidateInput] = useState({
    amount: {
      shouldValidate: false,
      validationLogic: isAmountValid,
      isValid: isAmountValid(recipientData.amount)
    },
    email: {
      shouldValidate: false,
      validationLogic: isEmailValid,
      isValid: isEmailValid(recipientData.email)
    }
  });

  const handleChange = useCallback((dataFromChild) => {
    for (let key in dataFromChild) {
      setValidateInput(prevValid => ({...prevValid, [key]: {...prevValid[key], isValid: prevValid[key].validationLogic(dataFromChild[key])}}));
    }

    setRecipientData(prevUser => ({...prevUser, ...dataFromChild}));
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
    console.log(recipientData);
    console.log('User account has been created');
  }

  return (
    <Form title="User Transfer Details" onSubmit={handleSignup}>
      <InputField type="amount" placeHolder="Amount" value={recipientData.amount} onChange={handleChange} validateInput={validateInput.amount} setShouldValidate={setShouldValidate} errorMessage="Please enter a valid amount" />
      <InputField placeHolder="Email" value={recipientData.email} onChange={handleChange} validateInput={validateInput.email} setShouldValidate={setShouldValidate} errorMessage="Please enter a valid email address" />

      <Button label="Send" onClick={handleSignup} disabled={disableButton} />
    </Form>
  );
};

export { RecipientUserForm };
