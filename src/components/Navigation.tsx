import { MenuItem } from '@/services/MenuRepository';

type Props = {
  menuItems: MenuItem[];
};

export default function Menu({ menuItems }: Props): React.JSX.Element {
  return (
    <ul>
      {menuItems.map((menuItem): React.JSX.Element => {
        return (
          <li key={menuItem.id}>
            <a href={menuItem.uri}>{menuItem.label}</a>
          </li>
        );
      })}
    </ul>
  );
}
