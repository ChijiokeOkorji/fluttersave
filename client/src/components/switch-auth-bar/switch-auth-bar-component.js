import { Link } from 'react-router-dom';

import { Button } from '../button';

import styles from './switch-auth-bar-style.module.scss';

const SwitchAuthenticationBar = ({ redirectTo, message, buttonLabel }) => {
  return (
    <div className={styles.signInArea}>
      <span>{message}</span>

      <Link to={redirectTo}>
        <Button type="text" label={buttonLabel} />
      </Link>
    </div>
  );
};

export { SwitchAuthenticationBar };
