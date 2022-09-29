import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { updateBalance } from '../store/balance';

import axios from 'axios';

import { Main } from '../components/main';
import { Balance } from '../components/balance';
import { ContainerRow } from '../components/container-row';
import { Button } from '../components/button';

const HomePage = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user);
  const balanceData = useSelector(state => state.balance);

  useEffect(() => {
    async function getBalance() {
      const data = await axios.get(`/fluttersave/balance/${userData["User ID"]}`);

      dispatch(updateBalance(data.data.Balance));
    }

    getBalance();
  }, [dispatch, userData, balanceData]);

  return (
    <Main align="spread">
      <Balance balance={balanceData} />
      
      <ContainerRow>
        <Link to="/send">
          <Button label="Send Money" />
        </Link>

        <Link to="/deposit">
          <Button label="Deposit Money" />
        </Link>
      </ContainerRow>
    </Main>
  );
};

export default HomePage;
