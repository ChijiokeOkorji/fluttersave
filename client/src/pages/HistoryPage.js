import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { updateHistory } from '../store/history';

import axios from 'axios';

import { Main } from '../components/main';
import { Entries } from '../components/entries';

const HistoryPage = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user);
  const historyData = useSelector(state => state.history);

  useEffect(() => {
    async function getHistory() {
      const response = await axios.get(`/fluttersave/history/${userData["User ID"]}`, {email: userData.Email});

      const formattedResponse = response.data.map(item => {
        const historyEntry = {
          "Date": item.createdAt,
          "Reference": item.reference,
          "Transaction Type": item.trnxType,
          "Purpose": item.purpose,
          "Amount": item.amount,
          "Currency": "NGN",
          "Summary": item.trnxSummary,
          "Bank": item.bankName,
          "Account Number": item.accountNumber,
          "Narration": item.trnxNarration
        };

        for (let key in historyEntry) {
          if (historyEntry[key] == null) {
            delete historyEntry[key];
          }
        }

        return historyEntry;
      });

      dispatch(updateHistory(formattedResponse));
    }

    getHistory();
  }, [dispatch, userData]);

  return (
    <Main>
      <Entries title="Transaction History" type="tx" data={historyData} />
    </Main>
  );
};

export default HistoryPage;
