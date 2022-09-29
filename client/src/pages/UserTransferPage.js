import { Main } from '../components/main';
import { BackButton } from '../components/back-button';
import { UserTransferForm } from '../components/user-transfer-form';

const RecipientUserPage = () => {
  return (
    <Main align="center">
      <BackButton />
      <UserTransferForm />
    </Main>
  );
};

export default RecipientUserPage;
