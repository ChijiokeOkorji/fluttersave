import axios from 'axios';

import { lazy, Suspense } from "react";
import { Routes, Route } from 'react-router-dom';

import { RequireAuth } from '../../pages/RequireAuth';
import { HomeLayout } from '../home-layout';
import { Loading } from '../loading';

import styles from './app-style.module.scss';

const SignUpPage = lazy(() => import('../../pages/SignUpPage'));
const LoginPage = lazy(() => import('../../pages/LoginPage'));
const HomePage = lazy(() => import('../../pages/HomePage'));
const DepositPage = lazy(() => import('../../pages/DepositPage'));
const PaymentModalPage = lazy(() => import('../../pages/PaymentModalPage'));
const TransferDestinationPage = lazy(() => import('../../pages/TransferDestinationPage'));
const RecipientBankPage = lazy(() => import('../../pages/RecipientBankPage'));
const RecipientUserPage = lazy(() => import('../../pages/RecipientUserPage'));
const HistoryPage = lazy(() => import('../../pages/HistoryPage'));
const HistoryDetailsPage = lazy(() => import('../../pages/HistoryDetailsPage'));
const ProfilePage = lazy(() => import('../../pages/ProfilePage'));

async function getData() {
  const data = await axios('/server');

  console.log(data.data);
}

getData();

const App = () => {
  return (
    <div className={styles.child}>
      <Suspense fallback={<Loading />}>
        <Routes>
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

            <Route path="history">
              <Route index element={<HistoryPage />} />
              <Route path=":id" element={<HistoryDetailsPage />} />
            </Route>

            <Route path="deposit">
              <Route index element={<DepositPage />} />
              <Route path="modal" element={<PaymentModalPage />} />
            </Route>

            <Route path="send">
              <Route index element={<TransferDestinationPage />} />
              <Route path="user" element={<RecipientUserPage />} />
              <Route path="bank" element={<RecipientBankPage />} />
            </Route>

            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

// TODO
// Entries title [DONE]
// Entries design (history and profile)[DONE?]
// History details page [DONE]
// Dropdown menu (with query) [DONE]
// Show name of valid account holder (input field) [DONE]
// Popups [DONE]
// Errors
// Restricted pages (auth) [DONE]
// Central store
// Fullstack integration
// Flutterwave integration
// Lazy loading [DONE]

export { App };
