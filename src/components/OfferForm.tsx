import { SyntheticEvent } from 'react';
import { useStore } from '../store/Store';
import { RateResponse, State, ValidatedState } from '../store/Types';
import { getText, LanguageResourceIds } from '../utils/Text';
import { createValidatedState } from '../utils/Validation';
import AddressSection from './AddressSection';
import ContactSection from './ContactSection';
import SectionHeader from './SectionHeader';
import SpecificationSection from './SpecificationSection';

const OfferForm = () => {
  const [state, setState] = useStore();
  const onSubmitHandler = async (event: SyntheticEvent) => {
    console.log('FORM_SUBMIT');
    event.preventDefault();

    // validate the state
    const validatedState = createValidatedState(state);

    // send rate request to API
    if (validatedState) {
      const rateApiConfig = createRateApiConfigString(validatedState);
      const { rate } = await fetchRate(rateApiConfig);

      setState((prevState) => ({ ...prevState, ...validatedState, rate }));
    }
  };

  function createRateApiConfigString({ routeDistance, floorSpace, secondarySpace, numberOfBulkyItems }: ValidatedState) {
    // TODO: question: the 'piano' option in the API is a boolean but it the UI sketch it looks like you should be able to
    // input several items -> which is correct?
    return [
      `distance=${routeDistance * 0.001}&`,
      `ordinaryVolume=${floorSpace}&`,
      `atticVolume=${secondarySpace}&`,
      `piano=${numberOfBulkyItems > 0 ? 'true' : 'false'}`,
    ].join('');
  }

  const fetchRate = async (config: string) => {
    console.log(config);
    const result = await fetch(`https://moveitcaseapi.azurewebsites.net/api/Rate?${config}`);
    const data = await result.json();

    console.log(data);
    return data as RateResponse;
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
