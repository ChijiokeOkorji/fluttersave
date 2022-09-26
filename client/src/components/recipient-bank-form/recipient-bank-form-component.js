import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import { Navigate } from 'react-router-dom';

import { isAmountValid } from "../../logic/input-validate";

import { Form } from "../form";
import { InputField } from "../input-field";
import { Dropdown } from "../dropdown";
import { Button } from "../button";

const data = [
  { id: 191, code: '044', name: 'Access Bank' },
  { id: 147, code: '323', name: 'Access Money' },
  { id: 174, code: '401', name: 'ASO Savings and & Loans' },
  { id: 173, code: '317', name: 'Cellulant' },
  { id: 162, code: '303', name: 'ChamsMobile' },
  { id: 145, code: '023', name: 'CitiBank' },
  { id: 183, code: '559', name: 'Coronation Merchant Bank' },
  { id: 164, code: '551', name: 'Covenant Microfinance Bank' },
  { id: 170, code: '063', name: 'Diamond Bank' },
  { id: 148, code: '302', name: 'Eartholeum' },
  { id: 152, code: '050', name: 'Ecobank Plc' },
  { id: 153, code: '307', name: 'EcoMobile' },
  { id: 169, code: '084', name: 'Enterprise Bank' },
  { id: 143, code: '306', name: 'eTranzact' },
  { id: 136, code: '309', name: 'FBNMobile' },
  { id: 187, code: '314', name: 'FET' },
  { id: 144, code: '070', name: 'Fidelity Bank' },
  { id: 154, code: '318', name: 'Fidelity Mobile' },
  { id: 137, code: '011', name: 'First Bank of Nigeria' },
  { id: 186, code: '214', name: 'First City Monument Bank' },
  { id: 159, code: '501', name: 'Fortis Microfinance Bank' },
  { id: 134, code: '308', name: 'FortisMobile' },
  { id: 184, code: '601', name: 'FSDH' },
  { id: 1731, code: '103', name: 'Globus Bank' },
  { id: 177, code: '058', name: 'GTBank Plc' },
  { id: 189, code: '315', name: 'GTMobile' },
  { id: 149, code: '324', name: 'Hedonmark' },
  { id: 175, code: '030', name: 'Heritage' },
  { id: 165, code: '415', name: 'Imperial Homes Mortgage Bank' },
  { id: 151, code: '301', name: 'JAIZ Bank' },
  { id: 176, code: '402', name: 'Jubilee Life Mortgage Bank' },
  { id: 181, code: '082', name: 'Keystone Bank' },
  { id: 185, code: '313', name: 'Mkudi' },
  { id: 150, code: '325', name: 'MoneyBox' },
  { id: 156, code: '999', name: 'NIP Virtual Bank' },
  { id: 166, code: '552', name: 'NPF MicroFinance Bank' },
  { id: 139, code: '990', name: 'Omoluabi Mortgage Bank' },
  { id: 182, code: '327', name: 'Pagatech' },
  { id: 132, code: '560', name: 'Page MFBank' },
  { id: 167, code: '526', name: 'Parralex' },
  { id: 160, code: '329', name: 'PayAttitude Online' },
  { id: 171, code: '305', name: 'Paycom' },
  { id: 180, code: '076', name: 'Polaris Bank' },
  { id: 140, code: '311', name: 'ReadyCash (Parkway)' },
  { id: 163, code: '403', name: 'SafeTrust Mortgage Bank' },
  { id: 158, code: '221', name: 'Stanbic IBTC Bank' },
  { id: 133, code: '304', name: 'Stanbic Mobile Money' },
  { id: 142, code: '068', name: 'Standard Chartered Bank' },
  { id: 179, code: '232', name: 'Sterling Bank' },
  { id: 138, code: '326', name: 'Sterling Mobile' },
  { id: 172, code: '100', name: 'SunTrust Bank' },
  { id: 135, code: '328', name: 'TagPay' },
  { id: 567, code: '90115', name: 'TCF MFB' },
  { id: 155, code: '319', name: 'TeasyMobile' },
  { id: 1413, code: '090175', name: 'Test bank' },
  { id: 188, code: '523', name: 'Trustbond' },
  { id: 178, code: '032', name: 'Union Bank' },
  { id: 190, code: '033', name: 'United Bank for Africa' },
  { id: 146, code: '215', name: 'Unity Bank' },
  { id: 157, code: '320', name: 'VTNetworks' },
  { id: 168, code: '035', name: 'Wema Bank' },
  { id: 141, code: '057', name: 'Zenith Bank' },
  { id: 161, code: '322', name: 'ZenithMobile' }
];

const bankPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(data);
  }, 2000);
});

const RecipientBankForm = () => {
  const [banks, setBanks] = useState([]);
  const [accountName, setAccountName] = useState('');

  const [recipientData, setRecipientData] = useState({
    amount: '',
    bank: '',
    accountNumber: ''
  });

  const [validateInput, setValidateInput] = useState({
    amount: {
      shouldValidate: false,
      validationLogic: isAmountValid,
      isValid: isAmountValid(recipientData.amount)
    },
    accountNumber: {
      shouldValidate: false,
      isValid: false
    }
  });

  const timeoutID = useRef(null);

  // review
  const fetchBanks = useCallback(async () => {
    const data = await bankPromise;

    setBanks(data);
  }, []);

  useEffect(() => {
    if (!banks.length) {
      fetchBanks();
    }
  }, [banks.length, fetchBanks]);

  const handleChange = useCallback((dataFromChild) => {
    clearTimeout(timeoutID.current);

    for (let key in dataFromChild) {
      if ((/amount/).test(key)) {
        setValidateInput(prevValid => ({...prevValid, [key]: {...prevValid[key], isValid: prevValid[key].validationLogic(dataFromChild[key])}}));
      }

      if ((/accountNumber/).test(key)) {
        setAccountName('');

        if ((/0223137469/).test(dataFromChild[key]) && (/058/).test(recipientData.bank)) {
          timeoutID.current = setTimeout(() => {
            setAccountName('Okorji, Chijioke Joseph');
            
            setValidateInput(prev => ({...prev, accountNumber: {isValid: true, shouldValidate: true}}));
          }, 1500);
        }
      }
    }

    setRecipientData(prev => ({...prev, ...dataFromChild}));
  }, [recipientData.bank]);

  const handleSelect = useCallback((dataFromChild) => {
    setValidateInput(prev => ({...prev, accountNumber: {...prev.accountNumber, shouldValidate: false}}));

    setRecipientData(prev => ({...prev, bank: dataFromChild, accountNumber: ''}));
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
    if (!accountName) return true;

    for (let key in validateInput) {
      if (!(validateInput[key].isValid)) {
        return true;
      }
    }

    return false;
  }, [accountName, validateInput]);

  async function handleSignup() {
    console.log(recipientData);
    console.log('User has logged in');
  }

  return (
    <Form title="Bank Withdrawal Details" onSubmit={handleSignup}>
      <InputField type="amount" placeHolder="Amount" value={recipientData.amount} onChange={handleChange} validateInput={validateInput.amount} setShouldValidate={setShouldValidate} errorMessage="Please enter a valid amount" />

      <Dropdown data={banks} value={recipientData.bank} onSelect={handleSelect} />

      <InputField placeHolder="Account Number" value={recipientData.accountNumber} onChange={handleChange} validateInput={validateInput.accountNumber} setShouldValidate={setShouldValidate} errorMessage="Please enter a valid account number" />
      <div>{accountName}</div>

      <Button label="Send" onClick={handleSignup} disabled={disableButton} />
    </Form>
  );
};

export { RecipientBankForm };
