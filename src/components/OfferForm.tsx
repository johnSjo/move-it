import { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../App';
import { getSettings, useStore } from '../store/Store';
import { createRateApiConfigString, fetchRate } from '../utils/RateAPI';
import { getText, LanguageResourceIds } from '../utils/Text';
import { createValidatedState } from '../utils/Validation';
import AddressSection from './AddressSection';
import ContactSection from './ContactSection';
import SectionHeader from '../elements/SectionHeader';
import SpecificationSection from './SpecificationSection';

const OfferForm = () => {
  const [state, setState] = useStore();
  const navigate = useNavigate();
  const onSubmitHandler = async (event: SyntheticEvent) => {
    console.log('FORM_SUBMIT');
    event.preventDefault();

    // validate the state
    const validatedState = createValidatedState(state);

    // send rate request to API
    if (validatedState) {
      const rateApiConfig = createRateApiConfigString(validatedState);
      const { rate } = await fetchRate(rateApiConfig);

      const { locales, options } = getSettings().currencyFormat;
      const currencyFormatter = new Intl.NumberFormat(locales, options);

      console.log(currencyFormatter.format(rate));

      setState((prevState) => ({ ...prevState, ...validatedState, rate: currencyFormatter.format(rate) }));
      navigate(RoutePath.OFFER);
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <SectionHeader index={1} title={LanguageResourceIds.CONTACTS} />
      <ContactSection />
      <SectionHeader index={2} title={LanguageResourceIds.ADDRESS} />
      <AddressSection />
      <SectionHeader index={3} title={LanguageResourceIds.MOVE_SPECIFICATIONS} />
      <SpecificationSection />
      <input type='submit' value={getText(LanguageResourceIds.FORM_SUBMIT)} />
    </form>
  );
};

export default OfferForm;
