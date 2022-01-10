import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import OfferForm from './components/OfferForm';
import StoreProvider from './store/Store';
import { getText, LanguageResourceIds } from './utils/Text';

export enum RoutePath {
    ROOT = '/',
    OFFER = '/offer',
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
              <h1>{getText(LanguageResourceIds.FORM_TITLE)}</h1>
              <OfferForm />
            </>
          }
        ></Route>
        <Route
          path={RoutePath.OFFER}
          element={
            <>
              <h1>{getText(LanguageResourceIds.OFFER_TITLE)}</h1>
              <OfferForm />
            </>
          }
        ></Route>
      </Routes>
    </StoreProvider>
  );
}

export default App;
