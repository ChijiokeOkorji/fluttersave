import styles from './main-style.module.scss';

const Main = ({ children, align }) => {
  return (
    <main className={`${(align === 'center') ? `${styles.center} ` : (align === 'spread') ? `${styles.spread} ` :  ''} ${styles.main}`}>
      {children}
    </main>
  );
};

export { Main };
