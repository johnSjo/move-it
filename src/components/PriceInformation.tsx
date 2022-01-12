import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutePath } from '../App';
import SectionHeader from '../elements/SectionHeader';
import { useStore } from '../store/Store';
import { getOfferFromMockBackend } from '../utils/MockBackend';
import { getText, LanguageResourceIds } from '../utils/Text';

const PriceInformation = () => {
  const [state, setState] = useStore();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getOffer = async (id: string) => {
      const offer = await getOfferFromMockBackend(id);

      if (offer.id) {
        setState(offer);
      } else {
        navigate(RoutePath.ROOT);
      }
    };

    if (!state.id) {
      if (params.offerId) {
        getOffer(params.offerId);
      } else {
        navigate(RoutePath.ROOT);
      }
    }
  });

  return (
    <form className='content'>
      <SectionHeader title={LanguageResourceIds.PRICE_INFORMATION} />
      <div className='info-section'>
        <div className='info-text'>
          <div className='price-info'>
            <p>{getText(LanguageResourceIds.PRICE_ESTIMATION, [state.rate ?? '[ERROR]'])}</p>
            <p>{getText(LanguageResourceIds.TOTAL_DISTANCE, [state.distanceText ?? '[ERROR]'])}</p>
          </div>

          <div className='contact-info'>
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
          </div>
        </div>

        <div className='info-submit'>
          <input type='submit' value={getText(LanguageResourceIds.APPROVE_OFFER)} />
        </div>
      </div>
    </form>
  );
};

export default PriceInformation;
