import Header from './components/Header';
import OfferForm from './components/OfferForm';
import StoreProvider from './store/Store';
import { getText, LanguageResourceIds } from './utils/Text';

function App() {
  return (
    <StoreProvider>
      <Header />
      <h1>{getText(LanguageResourceIds.FORM_TITLE)}</h1>
      <OfferForm />
    </StoreProvider>
  );
}

export default App;
