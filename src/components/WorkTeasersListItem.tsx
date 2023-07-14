import Link from 'next/link';
import Image from 'next/image';
import Container from './Container';
import { WorkTeaser } from '@/utils/models';

interface Props {
  workTeaser: WorkTeaser;
}

const dateFormatter = new Intl.DateTimeFormat('da-DK', {
  month: 'long',
  year: 'numeric',
});

export default function WorkTeasersListItem({
  workTeaser,
}: Props): JSX.Element {
  const { title, image, date } = workTeaser;
  const dateString = dateFormatter.format(new Date(date));

  return (
    <li className='mb-6'>
      <Link href={title}>
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
            <time dateTime={date}>{dateString}</time>
          </div>
        </Container>
      </Link>
    </li>
  );
}
