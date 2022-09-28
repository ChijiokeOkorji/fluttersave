import { useEffect } from 'react';
import { PageOverlay } from '../page-overlay';

const PaymentModal = ({ src }) => {
  useEffect(() => {
    console.log('I was rendered');
  });

  return (
    <PageOverlay type="full">
      <iframe title="Card Payment Modal" src={src} />
    </PageOverlay>
  );
};

export { PaymentModal };
