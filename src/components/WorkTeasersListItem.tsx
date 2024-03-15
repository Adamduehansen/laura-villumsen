import { WorkTeaser } from '@/services/WorkRepository';
import Image from 'next/image';
import Link from 'next/link';

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
      <span className='hidden lg:absolute lg:bottom-2 lg:left-4 lg:opacity-0 lg:duration-700 lg:group-hover:opacity-100 lg:flex lg:gap-x-12'>
        <span>{client}</span>
        <span>{text}</span>
      </span>
    </div>
  );
}
