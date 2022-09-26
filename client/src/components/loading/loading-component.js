import { PageOverlay } from '../page-overlay';

import Logo from '../../assets/flutterwave-logo.png';

import styles from './loading-style.module.scss';

const Loading = () => {
  return (
    <PageOverlay type="full">
      <img className={styles.image} src={Logo} alt="Flutterwave Logo" />
    </PageOverlay>
  );
};

export { Loading };
