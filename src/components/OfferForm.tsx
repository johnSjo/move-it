import { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../App';
import FormButton from '../elements/FormButton';
import LoadingCover from '../elements/LoadingCover';
import SectionHeader from '../elements/SectionHeader';
import { formatCurrency, getSettings, useStore } from '../store/Store';
import { State, ValidatedState } from '../store/Types';
import { addOfferToMockBackend } from '../utils/MockBackend';
import { createRateApiConfigString, fetchRate } from '../utils/RateAPI';
import { LanguageResourceIds } from '../utils/Text';
import { validateState } from '../utils/Validation';
import AddressSection from './AddressSection';
import ContactSection from './ContactSection';
import SpecificationSection from './SpecificationSection';

const OfferForm = () => {
  const [state, setState] = useStore();
  const [fetchingRate, setFetchingRate] = useState(false);
  const navigate = useNavigate();
  const onSubmitHandler = async (event: SyntheticEvent) => {
    console.log('FORM_SUBMIT');
    event.preventDefault();

    // validate the state
    const { isValid, testResults } = validateState(state);

    if (isValid) {
      const validatedState = { ...getSettings().optionalStateProperties, ...state } as ValidatedState;
      // send rate request to API
      const rateApiConfig = createRateApiConfigString(validatedState);

      setFetchingRate(true);

      const { rate } = await fetchRate(rateApiConfig);
      const newState = (await addOfferToMockBackend({
        ...state,
        ...validatedState,
        rate: formatCurrency(rate),
        invalidProps: [],
        addressFrom: state.startAddress,
        addressTo: state.endAddress,
      })) as State;

      setFetchingRate(false);
      setState(newState);
      navigate(`${RoutePath.OFFER}/${newState.id}`);
    } else {
      const invalidProps = testResults.reduce(
        (invalidProps: string[], { valid, prop }) => (!valid ? [...invalidProps, prop] : invalidProps),
        []
      );

      setState((prevState) => ({ ...prevState, invalidProps }));
    }
  };

  // TODO: look into supporting command + enter to submit form
  // const onKeyPressHandler = (event: KeyboardEvent<HTMLFormElement>) => {
  //     const { key, metaKey } = event;
  //     if (metaKey && key === 'Enter') {
  //         onSubmitHandler(event);
  //     }
  //     console.log(event);
  //   };

  return (
    <form>
      {fetchingRate ? <LoadingCover /> : ''}
      <SectionHeader index={1} title={LanguageResourceIds.CONTACTS} />
      <ContactSection />
      <SectionHeader index={2} title={LanguageResourceIds.ADDRESS} />
      <AddressSection />
      <SectionHeader index={3} title={LanguageResourceIds.MOVE_SPECIFICATIONS} />
      <SpecificationSection />
      <FormButton onSubmitHandler={onSubmitHandler} />
    </form>
  );
};

export default OfferForm;
