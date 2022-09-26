import styles from './button-style.module.scss';

/* Button Types
contained
outlined
text */

const Button = ({ type = 'contained', iconClass, label, onClick, disabled }) => {
  return (
    <button 
      className={styles[type]}
      onClick={onClick}
      disabled={disabled}
    >
      {iconClass && type !== 'text' && <i className={`${styles.icon} ${iconClass}`} />}
      <span className={styles.label}>{label.toUpperCase()}</span>
    </button>
  );
};

export { Button };
