import { Main } from '../components/main';
import { BackButton } from '../components/back-button';
import { TransferDestination } from '../components/transfer-destination';

const TransferDestinationPage = () => {
  return (
    <Main>
      <BackButton />
      <TransferDestination />
    </Main>
  );
};

export default TransferDestinationPage;
