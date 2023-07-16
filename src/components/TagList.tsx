import { Tag } from '@/utils/models';

interface Props {
  tags: Tag[];
  className?: string;
}

export default function TagList({ tags, className }: Props): JSX.Element {
  return (
    <ul className={className}>
      {tags.map(({ id, name }): JSX.Element => {
        return <li key={id}>{name}</li>;
      })}
    </ul>
  );
}
