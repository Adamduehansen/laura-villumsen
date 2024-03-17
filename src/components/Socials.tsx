import { MenuItem } from '@/services/MenuRepository';

type Props = {
  menuItem: MenuItem[];
};

export default function Socials({ menuItem }: Props): React.JSX.Element {
  return (
    <ul className='flex'>
      {menuItem.map((menuItem): React.JSX.Element => {
        return (
          <li key={menuItem.id}>
            <a href={menuItem.uri}>{menuItem.label}</a>
          </li>
        );
      })}
    </ul>
  );
}
