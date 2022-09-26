import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { ContainerRow } from '../container-row';
import { IconButton } from '../icon-button';

const BackButton = () => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <ContainerRow space="between">
      <IconButton className="fa-solid fa-arrow-left" caption="Back" onClick={handleClick} />
    </ContainerRow>
  );
};

export { BackButton };
