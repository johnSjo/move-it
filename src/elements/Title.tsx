import { useStore } from '../store/Store';
import { getText, LanguageResourceIds } from '../utils/Text';

interface TitleConfig {
  readonly id: LanguageResourceIds;
}

const Title = ({ id }: TitleConfig) => {
  const [state] = useStore();
  return (
    <div className={'title'}>
      <h1>{getText(id, state.id !== undefined ? [state.id.toString()] : [])}</h1>
    </div>
  );
};

export default Title;
