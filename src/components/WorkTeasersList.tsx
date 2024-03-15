import { wordPressClient } from '@/services/WordPressClient';
import Col from './Col';
import Container from './Container';
import WorkTeasersListItem from './WorkTeasersListItem';

export default async function WorkTeasersList() {
  const workTeasers = await wordPressClient.work.getTeasers();

  return (
    <Container fluid className='gap-2'>
      {workTeasers.map((workTeaser, index): JSX.Element => {
        return (
          <Col lg={(index + 1) % 3 === 0 ? 12 : 6} key={workTeaser.id}>
            <WorkTeasersListItem key={workTeaser.id} workTeaser={workTeaser} />
          </Col>
        );
      })}
    </Container>
  );
}
