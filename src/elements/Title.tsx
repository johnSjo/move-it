import { getText, LanguageResourceIds } from '../utils/Text';

interface TitleConfig {
  id: LanguageResourceIds;
}

const Title = ({ id }: TitleConfig) => {
  return <h1>{getText(id)}</h1>;
};

export default Title;
