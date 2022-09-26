import { Link, useLocation } from 'react-router-dom';

import styles from './icon-link-button-style.module.scss';

const IconLinkButton = ({ className, to, caption, onClick }) => {
  const location = useLocation();
  const match = location.pathname === to;

  return (
    <Link to={to}>
      <button
        className={`${match ? `${styles.active} ` : ''}${styles.button}`}
        onClick={onClick}
      >
        <i className={`${(className != null) ? (`${className} `) : ""}${styles.icon}`} />
        {(caption != null) && <span className={styles.subtitle}>{caption}</span>}
      </button>
    </Link>
  );
};

export { IconLinkButton };
