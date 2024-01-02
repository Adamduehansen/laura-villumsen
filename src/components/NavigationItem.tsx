import classNames from 'classnames';
import Link from 'next/link';

interface Props {
  url: string;
  text: string;
  className?: string;
}

export default function NavigationItem({
  url,
  text,
  className,
}: Props): JSX.Element {
  return (
    <li>
      <Link
        href={url}
        className={classNames(
          'block break-words font-neue-haas text-[5rem] uppercase max-[375px]:text-[4.375rem] md:text-[8.1rem] lg:text-[3.9rem] xl:text-[4.9rem] 2xl:text-[5.3rem] relative',
          className,
        )}
      >
        {text}
      </Link>
    </li>
  );
}
