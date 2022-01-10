import { Outlet, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import OfferForm from './components/OfferForm';
import OfferSummary from './components/OfferSummary';
import PriceInformation from './components/PriceInformation';
import Title from './elements/Title';
import StoreProvider from './store/Store';
import { LanguageResourceIds } from './utils/Text';

export enum RoutePath {
  ROOT = '/',
  OFFER = 'offer',
}

function App() {
  return (
    <StoreProvider>
      <Header />
      <Routes>
        <Route
          path={RoutePath.ROOT}
          element={
            <>
              <Title id={LanguageResourceIds.FORM_TITLE} />
              <OfferForm />
            </>
          }
        ></Route>
        <Route path={RoutePath.OFFER} element={<Outlet />}>
          <Route
            path=':offerId'
            element={
              <>
                <Title id={LanguageResourceIds.OFFER_TITLE} />
                <OfferSummary />
                <PriceInformation />
              </>
            }
          ></Route>
        </Route>
        <Route
          path='*'
          element={
            <main style={{ padding: '1rem' }}>
              <p>There's nothing here!</p>
            </main>
          }
        ></Route>
      </Routes>
    </StoreProvider>
  );
}

export default App;
