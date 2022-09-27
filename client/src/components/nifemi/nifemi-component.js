import { useCallback, useMemo, useState } from "react";

import { isNameValid, isEmailValid, isPhoneNumberValid, isPasswordValid, isAmountValid } from "../../logic/input-validate";

import { Main } from '../main';
import { Form } from '../form';
import { InputField } from '../input-field';
import { Button } from '../button';


const Nifemi = () => {
    const [amount, setAmount] = useState('');

    const [validateAmount, setValidateAmount] = useState({
        shouldValidate: false,
        validationLogic: isAmountValid,
        isValid: isAmountValid(amount)
    });
    console.log(validateAmount.isValid)

    const handleChange = useCallback((dataFromChild) => {
        for (let key in dataFromChild) {
            setAmount(dataFromChild[key])
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

        return false
    }, [validateAmount]);


    return (
        <Main>
            <Form title="Send Payments" >
                <InputField placeHolder="Amount" value={amount} onChange={handleChange} validateInput={validateAmount} setShouldValidate={setShouldValidate} errorMessage="Please enter a valid amount" />
                <Button label="Pay now" disabled={disableButton} />
            </Form>
        </Main>

    );
};

export { Nifemi };