import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from 'axios';

import { isAmountValid, isEmailValid } from "../../logic/input-validate";

import { Loading } from "../loading";
import { Form } from "../form";
import { InputField } from "../input-field";
import { Button } from "../button";

const UserTransferForm = () => {
  const userData = useSelector(store => store.user);
  const navigate = useNavigate();

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

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');

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

    return false;
  }, [validateInput]);

  async function handleSubmit() {
    try {
      setIsLoading(true);

      const data = await axios.post('/fluttersave/transfer', {
        toEmail: recipientData.email,
        fromEmail: userData.Email,
        amount: recipientData.amount
      });

      setServerError(data.data.message);

      setIsLoading(false);

      setTimeout(() => {
        setServerError('');
        navigate("/home");
    }, 2000);

    } catch(err) {
      setIsLoading(false);

      setServerError(err.response.data.message);

      setTimeout(() => {
        setServerError('');
      }, 2000);
    }
  }

  return (
    <Form title="User Transfer Details" onSubmit={handleSubmit} popup={serverError}>
      <InputField type="amount" placeHolder="Amount" value={recipientData.amount} onChange={handleChange} validateInput={validateInput.amount} setShouldValidate={setShouldValidate} errorMessage="Please enter a valid amount" />
      <InputField placeHolder="Email" value={recipientData.email} onChange={handleChange} validateInput={validateInput.email} setShouldValidate={setShouldValidate} errorMessage="Please enter a valid email address" />

      <Button label="Send" disabled={disableButton} />

      {isLoading &&
        <Loading />
      }
    </Form>
  );
};

export { UserTransferForm };
