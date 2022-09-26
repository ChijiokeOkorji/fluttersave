import { Main } from '../components/main';
import { BackButton } from '../components/back-button';
import { RecipientBankForm } from '../components/recipient-bank-form';

const RecipientBankPage = () => {
  return (
    <Main align="center">
      <BackButton />
      <RecipientBankForm />
    </Main>
  );
};

export default RecipientBankPage;
