import { useLocation } from "react-router-dom";

import { Main } from "../components/main";
import { PaymentModal } from "../components/payment-modal";

const PaymentModalPage = () => {
  const location = useLocation();
  const src = location.state?.src;

  return (
    <Main align="center">
      <PaymentModal src={src} />
    </Main>
  );
};

export default PaymentModalPage;
