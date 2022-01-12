import { Link } from 'react-router-dom';
import { RoutePath } from '../App';
import SectionHeader from '../elements/SectionHeader';
import { getText, LanguageResourceIds } from '../utils/Text';
import AddressSummary from './AddressSummary';
import ContactSummary from './ContactSummary';
import SpecificationSummary from './SpecificationSummary';

const OfferSummary = () => {
  return (
    <div className={'content'}>
      <SectionHeader title={LanguageResourceIds.CONTACTS} />
      <ContactSummary />
      <SectionHeader title={LanguageResourceIds.ADDRESS} />
      <AddressSummary />
      <SectionHeader title={LanguageResourceIds.MOVE_SPECIFICATIONS} />
      <SpecificationSummary />
      <Link className='update-form-btn' to={RoutePath.ROOT}>
        {getText(LanguageResourceIds.CHANGE_DATA)}
      </Link>
    </div>
  );
};

export default OfferSummary;
