import { Link } from 'react-router-dom';

import styles from './entries-style.module.scss';

const Entries = ({ title, type, data }) => {
  return (
    <div className={styles.entryArea}>
      {title && <div className={styles.title}>{title}</div>}

      {(type === 'ls') && 
        Object.keys(data).map((item, index) => (
          <div className={styles.lsEntry} key={index}>
            <span className={styles.label}>{item}</span>
            <span>{data[item]}</span>
          </div>
        ))
      }

      {(type === 'tx') && 
        data.map((item, index) => (
          <Link to={`/history/${item.txRef}`} state={{ data: item }} key={index}>
            <div className={styles.txEntry}>
              <span className={styles.sender}>{item.sender}</span>

              <div
                className={`${(item.type === 'credit') ? styles.credit : styles.debit} ${styles.right}`}
              >
                <div>N{Number(item.amount).toLocaleString('us')}</div>
                <div>{(item.type === 'credit') ? 'Credit' : 'Debit'}</div>
              </div>
            </div>
          </Link>
        ))
      }
    </div>
  );
};

export { Entries };
