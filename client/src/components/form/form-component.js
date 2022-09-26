import { useCallback } from 'react';

import { PageOverlay } from '../page-overlay';

import styles from './form-style.module.scss';

const Form = ({ children, title, onSubmit, popup }) => {
  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    onSubmit();
  }, [onSubmit]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {title && <div className={styles.title}>{title}</div>}

      {children}

      {popup &&
        <PageOverlay type="popup">
          <div className={styles.popup}>{popup}</div>
        </PageOverlay>
      }
    </form>
  );
};

export { Form };
