import { getText, LanguageResourceIds } from '../utils/Text';

interface SectionHeaderConfig {
  readonly index?: number;
  readonly title: LanguageResourceIds;
}

const SectionHeader = ({ index, title }: SectionHeaderConfig) => {
  return (
    <div>
      {index ? <div>{index}</div> : ''}
      <h2>{getText(title)}</h2>
    </div>
  );
};

export default SectionHeader;
