import { Link } from 'react-router-dom';

import styles from './transfer-destination-style.module.scss';

const TransferDestination = ({ type = 'contained', iconClass, label, onClick, disabled }) => {
  return (
    <div className={styles.entryArea}>
      <div className={styles.title}>Select Destination</div>

      <div className={styles.entryAreas}>
        <Link to="/send/bank">
          <div className={styles.entry}>Bank Account</div>
        </Link>
        
        <Link to="/send/user">
          <div className={styles.entry}>User</div>
        </Link>
      </div>
    </div>
  );
};

export { TransferDestination };
