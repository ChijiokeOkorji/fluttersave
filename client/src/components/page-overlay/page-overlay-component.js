import styles from './page-overlay-style.module.scss';

/* 
TYPE
popup
full
 */

const PageOverlay = ({ children, type }) => {
  return (
    <div className={`${(type === 'popup') ? `${styles.popup} ` : ''}${(type === 'full') ? `${styles.full} ` : ''}${styles.pageOverlay}`}>
      {children}
    </div>
  );
};

export { PageOverlay };
