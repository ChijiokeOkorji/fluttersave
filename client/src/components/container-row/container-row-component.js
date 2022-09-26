import styles from './container-row-style.module.scss';

const ContainerRow = ({ children, space }) => {
  return (
    <div className={`${(space === 'between') ? `${styles.between} ` : ''}${styles.row}`}>
      {children}
    </div>
  );
};

export { ContainerRow };
