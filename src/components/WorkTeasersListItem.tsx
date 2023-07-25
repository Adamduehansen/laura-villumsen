import { WorkTeaser } from '@/utils/models';
import { formatDateString } from '@/utils/workDateFormatter';
import Image from 'next/image';
import Link from 'next/link';
import Container from './Container';

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
          className='mb-1 w-screen'
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
