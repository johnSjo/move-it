import SectionHeader from '../elements/SectionHeader';
import { useStore } from '../store/Store';
import { getText, LanguageResourceIds } from '../utils/Text';

const PriceInformation = () => {
  const [state] = useStore();
  // TODO: if rate not available -> re-route back to root
  return (
    <form>
      <SectionHeader index={0} title={LanguageResourceIds.PRICE_INFORMATION} />
      <p>
        {getText(LanguageResourceIds.PRICE_ESTIMATION)} <span>{state.rate}</span> {getText(LanguageResourceIds.INC_VAT)}
      </p>
      <p>
        {getText(LanguageResourceIds.TOTAL_DISTANCE)} <span>{state.distanceText}</span>
      </p>
      <p>
        {getText(LanguageResourceIds.OFFER_AVAILABLE_90_DAYS)}
        <br />
        {getText(LanguageResourceIds.QUESTIONS_CONTACT)}{' '}
        <a href={`mailto:${getText(LanguageResourceIds.MOVE_IT_EMAIL)}`} target='_blank'>
          {getText(LanguageResourceIds.MOVE_IT_EMAIL)}
        </a>
      </p>
      <p>
        {getText(LanguageResourceIds.REOPEN_OFFER)}{' '}
        <a href={window.location.href}>{`${window.location.hostname}${window.location.pathname}`}</a>
      </p>
      <input type='submit' value={getText(LanguageResourceIds.APPROVE_OFFER)} />
    </form>
  );
};

export default PriceInformation;
