import { getText, LanguageResourceIds } from '../utils/Text';

const LoadingCover = () => {
  return (
    <div className='loading-cover'>
      <p>{getText(LanguageResourceIds.ESTIMATING_PRICE)}</p>
      <svg className='estimating-spinner' role='alert' aria-live='assertive'>
        <circle cx='60' cy='60' r='40' className='circle' />
      </svg>
    </div>
  );
};

export default LoadingCover;
