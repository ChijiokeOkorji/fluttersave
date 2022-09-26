import { Main } from '../components/main';
import { PaymentModal } from '../components/payment-modal';

const PaymentModalPage = () => {
  return (
    <Main align="center">
      <PaymentModal src="https://ravemodal-dev.herokuapp.com/v3/hosted/pay/ae1dcdbf1d4bd21e191a" />
    </Main>
  );
};

export default PaymentModalPage;
