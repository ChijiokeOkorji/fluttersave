import { InputField } from '../input-field';
import { Button } from '../button';
import { Form } from '../form';

import { useSelector } from "react-redux";

import axios from 'axios';

import { Loading } from "../loading";
import { useCallback, useMemo, useState } from "react";
import { isAmountValid } from "../../logic/input-validate";

const DepositForm = () => {
    const userData = useSelector(store => store.user);

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

            setValidateAmount(prevValid => ({ ...prevValid, isValid: prevValid.validationLogic(dataFromChild[key]) }));
        }
    }, []);

    const setShouldValidate = useCallback(() => {
        setValidateAmount(prev => {
            if (prev.shouldValidate === false) {
                return ({ ...prev, shouldValidate: true });
            }

            return prev;
        });
    }, []);

    const disableButton = useMemo(() => {
        if (!(validateAmount.isValid)) {
            return true;
        }

        return false;
    }, [validateAmount]);

    async function handleSubmit() {
        try {
            setIsLoading(true);

            const response = await axios.post('/fluttersave/deposit', {
                fullname: `${userData["First Name"]} ${userData["Last Name"]}`,
                toEmail: userData.Email,
                mobileNumber: userData["Phone Number"],
                depositAmount: amount
            });

            window.location.href = response.data.link;
        } catch (err) {
            setIsLoading(false);

            setServerError(err.response.data.message);

            setTimeout(() => {
                setServerError('');
            }, 2000);
        }
    }

    return (
        <Form title={'Card Deposit'} onSubmit={handleSubmit} popup={serverError}>
            <InputField errorMessage={'Please enter a value between 100 and 500,000'} setShouldValidate={setShouldValidate} validateInput={validateAmount} onChange={handleChange} type='amount' value={amount} placeHolder='Amount' />

            <Button label="Deposit" disabled={disableButton} />

            {isLoading &&
                <Loading />
            }
        </Form>
    )
};

export { DepositForm };
