import { lazy, Suspense } from "react";
import { Routes, Route } from 'react-router-dom';

import { Loading } from '../loading';
import { ErrorPage } from '../../pages/ErrorPage';
import { RequireAuth } from '../../pages/RequireAuth';
import { HomeLayout } from '../home-layout';

import styles from './app-style.module.scss';

const SignUpPage = lazy(() => import('../../pages/SignUpPage'));
const LoginPage = lazy(() => import('../../pages/LoginPage'));
const HomePage = lazy(() => import('../../pages/HomePage'));
const DepositPage = lazy(() => import('../../pages/DepositPage'));
const TransferDestinationPage = lazy(() => import('../../pages/TransferDestinationPage'));
const BankWithdrawalPage = lazy(() => import('../../pages/BankWithdrawalPage'));
const UserTransferPage = lazy(() => import('../../pages/UserTransferPage'));
const HistoryPage = lazy(() => import('../../pages/HistoryPage'));
const HistoryDetailsPage = lazy(() => import('../../pages/HistoryDetailsPage'));
const ProfilePage = lazy(() => import('../../pages/ProfilePage'));

const App = () => {
  return (
    <div className={styles.child}>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="*" element={<ErrorPage />} />

          <Route path="/" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/"
            element={
              <RequireAuth>
                <HomeLayout />
              </RequireAuth>
            }
          >
            <Route path="home" element={<HomePage />} />
            <Route path="deposit" element={<DepositPage />} />

            <Route path="send">
              <Route index element={<TransferDestinationPage />} />
              <Route path="user" element={<UserTransferPage />} />
              <Route path="bank" element={<BankWithdrawalPage />} />
            </Route>

            <Route path="history">
              <Route index element={<HistoryPage />} />
              <Route path=":id" element={<HistoryDetailsPage />} />
            </Route>

            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export { App };
