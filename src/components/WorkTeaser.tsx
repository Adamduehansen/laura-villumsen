import { WorkTeaser } from '@/services/WorkRepository';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import Col from './Col';
import Container from './Container';
import Row from './Row';

type Props = Omit<WorkTeaser, 'id'>;

export default function WorkTeasersListItem({
  image,
  uri,
  client,
  text,
  frontpageColor,
}: Props): JSX.Element {
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
      <Container
        className={classNames(
          'absolute bottom-0 inset-x-0 text-xs pb-[10px] lg:opacity-0 lg:duration-700 lg:group-hover:opacity-100',
          {
            'text-white': frontpageColor === 'white',
            'text-black': frontpageColor === 'black',
          },
        )}
      >
        <Row>
          <Col className='flex gap-x-12'>
            <span>{client}</span>
            <span>{text}</span>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
