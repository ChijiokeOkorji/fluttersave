import { Main } from '../components/main';
import { Entries } from '../components/entries';

const data = [
  {
    txRef: 'A1',
    type: 'credit',
    sender: 'flutterwaveasadcddcsc@gmail.com',
    amount: 500000.00
  },
  {
    txRef: 'B2',
    type: 'debit',
    sender: 'johndoe@anonymous.com',
    amount: 200.01
  },
  {
    txRef: 'C3',
    type: 'credit',
    sender: 'chijioke@gmail.com',
    amount: 499999.99
  },{
    txRef: 'A1',
    type: 'credit',
    sender: 'flutterwaveasadcddcsc@gmail.com',
    amount: 500000.00
  },
  {
    txRef: 'B2',
    type: 'debit',
    sender: 'johndoe@anonymous.com',
    amount: 200.01
  },
  {
    txRef: 'C3',
    type: 'credit',
    sender: 'chijioke@gmail.com',
    amount: 499999.99
  },{
    txRef: 'A1',
    type: 'credit',
    sender: 'flutterwaveasadcddcsc@gmail.com',
    amount: 500000.00
  },
  {
    txRef: 'B2',
    type: 'debit',
    sender: 'johndoe@anonymous.com',
    amount: 200.01
  },
  {
    txRef: 'C3',
    type: 'credit',
    sender: 'chijioke@gmail.com',
    amount: 499999.99
  },{
    txRef: 'A1',
    type: 'credit',
    sender: 'flutterwaveasadcddcsc@gmail.com',
    amount: 500000.00
  },
  {
    txRef: 'B2',
    type: 'debit',
    sender: 'johndoe@anonymous.com',
    amount: 200.01
  },
  {
    txRef: 'C3',
    type: 'credit',
    sender: 'chijioke@gmail.com',
    amount: 499999.99
  },{
    txRef: 'A1',
    type: 'credit',
    sender: 'flutterwaveasadcddcsc@gmail.com',
    amount: 500000.00
  },
  {
    txRef: 'B2',
    type: 'debit',
    sender: 'johndoe@anonymous.com',
    amount: 200.01
  },
  {
    txRef: 'C3',
    type: 'credit',
    sender: 'chijioke@gmail.com',
    amount: 499999.99
  },
];

const HistoryPage = () => {
  return (
    <Main>
      <Entries title="Transaction History" type="tx" data={data} />
    </Main>
  );
};

export default HistoryPage;
