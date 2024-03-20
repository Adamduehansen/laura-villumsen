import { WorkTeaser } from '@/services/WorkRepository';
import Image from 'next/image';
import Link from 'next/link';
import Col from './Col';
import Container from './Container';
import Row from './Row';

interface Props {
  workTeaser: WorkTeaser;
}

export default function WorkTeasersListItem({
  workTeaser,
}: Props): JSX.Element {
  const { image, uri, client, text } = workTeaser;

  return (
    <div className='relative overflow-hidden group'>
      <Link
        href={uri}
        className='block scale-100 lg:duration-700 lg:ease-out lg:group-hover:scale-105'
      >
        {image && (
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className='w-full'
            priority
          />
        )}
      </Link>
      <Container className='absolute bottom-0 inset-x-0 text-xs pb-4 lg:opacity-0 lg:duration-700 lg:group-hover:opacity-100'>
        <Row>
          <Col sm={4}>
            <span>{client}</span>
          </Col>
          <Col sm={8}>
            <span>{text}</span>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
