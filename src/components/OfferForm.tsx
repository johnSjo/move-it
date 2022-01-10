import { SyntheticEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutePath } from '../App';
import { formatCurrency, getSettings, useStore } from '../store/Store';
import { createRateApiConfigString, fetchRate } from '../utils/RateAPI';
import { getText, LanguageResourceIds } from '../utils/Text';
import { createValidatedState } from '../utils/Validation';
import AddressSection from './AddressSection';
import ContactSection from './ContactSection';
import SectionHeader from '../elements/SectionHeader';
import SpecificationSection from './SpecificationSection';

const OfferForm = () => {
  const [state, setState] = useStore();
  const params = useParams();
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
      const offerId = Math.floor(Math.random() * 90000 + 10000); // NOTE: should come from backend

      setState((prevState) => ({
        ...prevState,
        ...validatedState,
        rate: formatCurrency(rate),
        id: offerId,
      }));
      navigate(`${RoutePath.OFFER}/${offerId}`);
    }
  };

  console.log(params.offerId);

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
