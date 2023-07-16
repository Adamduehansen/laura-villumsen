import Link from 'next/link';
import Image from 'next/image';
import Container from './Container';
import { WorkTeaser } from '@/utils/models';
import { formatDateString } from '@/utils/workDateFormatter';

interface Props {
  workTeaser: WorkTeaser;
}

export default function WorkTeasersListItem({
  workTeaser,
}: Props): JSX.Element {
  const { title, image, path, date } = workTeaser;

  return (
    <li className='mb-6'>
      <Link href={path}>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className='mb-1'
          priority
        />
        <Container>
          <div className='flex justify-between'>
            <h2>{title}</h2>
            <time dateTime={date}>{formatDateString(date)}</time>
          </div>
        </Container>
      </Link>
    </li>
  );
}
