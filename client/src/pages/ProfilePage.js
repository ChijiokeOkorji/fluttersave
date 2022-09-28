import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../store/user';

import { Main } from '../components/main';
import { Entries } from '../components/entries';
import { ContainerRow } from '../components/container-row';
import { Button } from '../components/button';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const userData = useSelector(store => store.user);

  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    dispatch(logout());

    navigate('/home');
  }, [dispatch, navigate]);

  return (
    <Main>
      <Entries title="User Profile" type="ls" data={userData} />

      <ContainerRow>
        <Button type="outlined" iconClass="fa-solid fa-arrow-right-from-bracket" label="Sign Out" onClick={handleClick} />
      </ContainerRow>
    </Main>
  );
};

export default ProfilePage;
