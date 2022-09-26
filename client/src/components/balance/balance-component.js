import { useMemo } from 'react';

import styles from './balance-style.module.scss';

const Balance = ({ balance }) => {
  const formatNumber = useMemo(() => {
    return Number(balance).toLocaleString('us');
  }, [balance]);

  return (
    <div className={styles.balance}>
      <span className={styles.title}>Balance</span>
      <span className={styles.amount}>N{formatNumber}</span>
    </div>
  );
};

export { Balance };
