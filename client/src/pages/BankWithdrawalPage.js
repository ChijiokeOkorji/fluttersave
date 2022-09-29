import { Main } from '../components/main';
import { BackButton } from '../components/back-button';
import { BankWithdrawalForm } from '../components/bank-withdrawal-form';

const RecipientBankPage = () => {
  return (
    <Main align="center">
      <BackButton />
      <BankWithdrawalForm />
    </Main>
  );
};

export default RecipientBankPage;
