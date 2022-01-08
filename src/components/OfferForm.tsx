import { getText, LanguageResourceIds } from '../utils/Text';
import AddressSection from './AddressSection';
import ContactSection from './ContactSection';
import SectionHeader from './SectionHeader';
import SpecificationSection from './SpecificationSection';

const OfferForm = () => {
  return (
    <form>
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
