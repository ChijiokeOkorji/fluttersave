import { Main } from '../components/main';
import { BackButton } from '../components/back-button';
import { DepositForm } from '../components/deposit-form';

const DepositPage = () => {
  return (
    <Main align="center">
      <BackButton />
      <DepositForm />
    </Main>
  );
};

export default DepositPage;
