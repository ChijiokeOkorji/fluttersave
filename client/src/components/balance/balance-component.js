import { formatNumber } from '../../logic/format-number';

import styles from './balance-style.module.scss';

const Balance = ({ balance }) => {
  return (
    <div className={styles.balance}>
      <span className={styles.title}>Balance</span>
      <span className={styles.amount}>N{formatNumber(balance)}</span>
    </div>
  );
};

export { Balance };
