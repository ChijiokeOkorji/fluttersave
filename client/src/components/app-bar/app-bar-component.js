import styles from './app-bar-style.module.scss';

const AppBar = ({ children, isBottom }) => {
  return (
    <div
      className={`${isBottom ? styles.bottom : styles.top} ${styles.appBar}`}
    >
      {children}
    </div>
  );
};

export { AppBar };
