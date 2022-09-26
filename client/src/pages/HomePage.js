import { Link } from 'react-router-dom';

import { Main } from '../components/main';
import { Balance } from '../components/balance';
import { ContainerRow } from '../components/container-row';
import { Button } from '../components/button';

const HomePage = () => {
  return (
    <Main align="spread">
      <Balance balance="1234567890.01" />
      
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
