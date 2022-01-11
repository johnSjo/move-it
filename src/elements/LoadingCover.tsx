import { getText, LanguageResourceIds } from '../utils/Text';

const LoadingCover = () => {
  return (
    <div className='loading-cover'>
      <p>{getText(LanguageResourceIds.ESTIMATING_PRICE)}</p>
      <svg className='spinner' role='alert' aria-live='assertive'>
        <circle cx='30' cy='30' r='20' className='circle' />
      </svg>
    </div>
  );
};

export default LoadingCover;
