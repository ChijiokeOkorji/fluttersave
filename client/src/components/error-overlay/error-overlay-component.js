import { Link } from 'react-router-dom';

import { PageOverlay } from '../page-overlay';

import styles from './error-overlay-style.module.scss';

const ErrorOverlay = () => {
  return (
    <PageOverlay type="full">
      <div className={styles.errorArea}>
        <div className={styles.title}>Page Does Not Exist</div>
        <div className={styles.body}>Don't worry, you can still return to <Link to="/home">HOME PAGE</Link></div>
      </div>
    </PageOverlay>
  );
};

export { ErrorOverlay };
