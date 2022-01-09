import { SyntheticEvent } from 'react';
import { getText, LanguageResourceIds } from '../utils/Text';
import AddressSection from './AddressSection';
import ContactSection from './ContactSection';
import SectionHeader from './SectionHeader';
import SpecificationSection from './SpecificationSection';

const OfferForm = () => {
  const onSubmitHandler = (event: SyntheticEvent) => {
      console.log('ENTER');
    event.preventDefault();
    return false;
  };

  return (
    <form>
      <SectionHeader index={1} title={LanguageResourceIds.CONTACTS} />
      <ContactSection />
      <SectionHeader index={2} title={LanguageResourceIds.ADDRESS} />
      <AddressSection />
      <SectionHeader index={3} title={LanguageResourceIds.MOVE_SPECIFICATIONS} />
      <SpecificationSection />
      {/* TODO: fix issue with submit on enter key */}
      {/* <input type='submit' value={getText(LanguageResourceIds.FORM_SUBMIT)} onSubmit={onSubmitHandler} /> */}
    </form>
  );
};

export default OfferForm;
