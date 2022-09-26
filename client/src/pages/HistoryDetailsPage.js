import { useLocation } from 'react-router-dom'

import { Main } from '../components/main';
import { BackButton } from '../components/back-button';
import { Entries } from '../components/entries';

const ProfilePage = () => {
  const location = useLocation();

  const { data } = location.state;

  return (
    <Main>
      <BackButton />
      <Entries title="Transaction Details" type="ls" data={data} />
    </Main>
  );
};

export default ProfilePage;
