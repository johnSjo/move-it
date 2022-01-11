import { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../App';
import SectionHeader from '../elements/SectionHeader';
import { formatCurrency, useStore } from '../store/Store';
import { State } from '../store/Types';
import { addOfferToMockBackend } from '../utils/MockBackend';
import { createRateApiConfigString, fetchRate } from '../utils/RateAPI';
import { getText, LanguageResourceIds } from '../utils/Text';
import { createValidatedState } from '../utils/Validation';
import AddressSection from './AddressSection';
import ContactSection from './ContactSection';
import SpecificationSection from './SpecificationSection';

const OfferForm = () => {
  const [state, setState] = useStore();
  const navigate = useNavigate();
  const onSubmitHandler = async (event: SyntheticEvent) => {
    console.log('FORM_SUBMIT');
    event.preventDefault();

    // validate the state
    const validatedState = createValidatedState(state);

    if (validatedState) {
      // send rate request to API
      const rateApiConfig = createRateApiConfigString(validatedState);
      const { rate } = await fetchRate(rateApiConfig);
      const newState = (await addOfferToMockBackend({ ...state, ...validatedState, rate: formatCurrency(rate) })) as State;

      setState(newState);
      navigate(`${RoutePath.OFFER}/${newState.id}`);
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
