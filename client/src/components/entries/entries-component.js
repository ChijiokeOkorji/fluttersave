import { Link } from 'react-router-dom';

import { formatNumber } from '../../logic/format-number';

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
          <Link to={`/history/${item.id}`} state={{ data: item }} key={index}>
            <div className={styles.txEntry}>
              <span className={styles.reference}>{item.Reference}</span>

              <div
                className={`${(item["Transaction Type"] === 'CR') ? styles.credit : styles.debit} ${styles.right}`}
              >
                <div>N{formatNumber(parseFloat(item.Amount))}</div>
                <div>{(item["Transaction Type"] === 'CR') ? 'Credit' : 'Debit'}</div>
              </div>
            </div>
          </Link>
        ))
      }
    </div>
  );
};

export { Entries };
