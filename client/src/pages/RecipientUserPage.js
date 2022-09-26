import { Main } from '../components/main';
import { BackButton } from '../components/back-button';
import { RecipientUserForm } from '../components/recipient-user-form';

const RecipientUserPage = () => {
  return (
    <Main align="center">
      <BackButton />
      <RecipientUserForm />
    </Main>
  );
};

export default RecipientUserPage;
