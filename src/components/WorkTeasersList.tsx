import { WorkTeaser } from '@/utils/models';
import WorkTeasersListItem from './WorkTeasersListItem';

interface Props {
  workTeasers: WorkTeaser[];
}

export default function WorkTeasersList({ workTeasers }: Props): JSX.Element {
  return (
    <ul>
      {workTeasers.map((workTeaser): JSX.Element => {
        return (
          <WorkTeasersListItem key={workTeaser.id} workTeaser={workTeaser} />
        );
      })}
    </ul>
  );
}
