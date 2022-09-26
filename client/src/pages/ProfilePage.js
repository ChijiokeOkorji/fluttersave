import { Main } from '../components/main';
import { Entries } from '../components/entries';
import { ContainerRow } from '../components/container-row';
import { Button } from '../components/button';

const data = {
  'First Name': 'Chijioke',
  'Last Name': 'Okorji',
  'Email': 'chijiokeokorji@gmail.com',
  'Phone Number': '(+234) 8165763848'
};

const ProfilePage = () => {
  return (
    <Main>
      <Entries title="User Profile" type="ls" data={data} />

      <ContainerRow>
        <Button type="outlined" iconClass="fa-solid fa-arrow-right-from-bracket" label="Sign Out" />
      </ContainerRow>
    </Main>
  );
};

export default ProfilePage;
