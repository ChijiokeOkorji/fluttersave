import { useCallback, useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateBank } from '../../store/bank';

import axios from 'axios';

import { isAmountValid } from "../../logic/input-validate";

import { Loading } from "../loading";
import { Form } from "../form";
import { InputField } from "../input-field";
import { Dropdown } from "../dropdown";
import { Button } from "../button";

let source = new axios.CancelToken.source();// for cancelling axios requests

const RecipientBankForm = () => {
  const dispatch = useDispatch();
  const bankData = useSelector(store => store.bank);
  const userData = useSelector(store => store.user);
  // const navigate = useNavigate();

  const [accountName, setAccountName] = useState('');

  const [recipientData, setRecipientData] = useState({
    amount: '',
    accountBank: '',
    accountNumber: '',
    summary: ''
  });

  const [validateInput, setValidateInput] = useState({
    amount: {
      shouldValidate: false,
      validationLogic: isAmountValid,
      isValid: isAmountValid(recipientData.amount),
    },
    accountNumber: {
      shouldValidate: false,
      isValid: false,
    },
  });

  useEffect(() => {
    if (!bankData.length) {
      async function getBanks() {
        const response = await axios.get('/fluttersave/banks');
  
        dispatch(updateBank(response.data.data));
      }

      getBanks();
    }
  }, [dispatch, bankData]);

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = useCallback(async (dataFromChild) => {
    setRecipientData(prev => ({...prev, ...dataFromChild}));

    for (let key in dataFromChild) {
      if ((/amount/).test(key)) {
        setValidateInput(prevValid => ({...prevValid, amount: {...prevValid.amount, isValid: prevValid.amount.validationLogic(dataFromChild[key])}}));
      }

      if ((/accountNumber/).test(key)) {
        source.cancel('');
        setAccountName('');

        try {
          source = new axios.CancelToken.source();// reset cancel token value

          const response = await axios.post('/fluttersave/account-validate', {
            accountNumber: dataFromChild[key],
            accountBank: recipientData.accountBank
          }, {cancelToken: source.token});
    
          setAccountName(response.data.account_name);

          setValidateInput(prevValid => ({...prevValid, accountNumber: {...prevValid.accountNumber, isValid: true}}));
        } catch(err) {
          setValidateInput(prevValid => ({...prevValid, accountNumber: {...prevValid.accountNumber, isValid: false}}));

          console.log(err.code);
        }
      }
    }
  }, [recipientData]);

  const handleSelect = useCallback((dataFromChild) => {
    setValidateInput(prev => ({...prev, accountNumber: {...prev.accountNumber, shouldValidate: false}}));

    setRecipientData(prev => ({...prev, accountBank: dataFromChild, accountNumber: ''}));
  }, []);

  const setShouldValidate = useCallback((dataFromChild) => {
    setValidateInput((prev) => {
      if (prev[dataFromChild].shouldValidate === false) {
        return {
          ...prev,
          [dataFromChild]: { ...prev[dataFromChild], shouldValidate: true },
        };
      }

      return prev;
    });
  }, []);

  const disableButton = useMemo(() => {
    if (!accountName) return true;

    for (let key in validateInput) {
      if (!validateInput[key].isValid) {
        return true;
      }
    }

    return false;
  }, [accountName, validateInput]);

  async function handleSubmit() {
    try {
      setIsLoading(true);

      const response = await axios.post('/fluttersave/withdraw', {
        fromEmail: userData.Email,
        amount: recipientData.amount,
        accountNumber: recipientData.accountNumber,
        bankCode: recipientData.accountBank,
        summary: recipientData.summary || ' '
      });

      console.log(response.data);

      // dispatch(login(response.data));

      // navigate(redirect || "/home");
    } catch(err) {
      setIsLoading(false);

      setServerError(err.response.data.message);

      setTimeout(() => {
        setServerError('');
      }, 2000);
    }
  }

  return (
    <Form title="Bank Withdrawal Details" onSubmit={handleSubmit} popup={serverError}>
      <InputField type="amount" placeHolder="Amount" value={recipientData.amount} onChange={handleChange} validateInput={validateInput.amount} setShouldValidate={setShouldValidate} errorMessage="Please enter a valid amount" />

      <Dropdown data={bankData} value={recipientData.accountBank} onSelect={handleSelect} />

      <InputField type="integer" placeHolder="Account Number" value={recipientData.accountNumber} onChange={handleChange} validateInput={validateInput.accountNumber} setShouldValidate={setShouldValidate} errorMessage="Please enter valid account details" />
      <div>{accountName}</div>

      <InputField placeHolder="Summary" value={recipientData.summary} onChange={handleChange} />

      <Button label="Send" disabled={disableButton} />

      {isLoading &&
        <Loading />
      }
    </Form>
  );
};

export { RecipientBankForm };
