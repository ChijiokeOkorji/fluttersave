import styles from './icon-button-style.module.scss';

const IconButton = ({ className, caption, onClick }) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
    >
      <i className={`${(className != null) ? (`${className} `) : ""}${styles.icon}`} />
      {(caption != null) && <span className={styles.subtitle}>{caption}</span>}
    </button>
  );
};

export { IconButton };
