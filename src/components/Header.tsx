import { wordPressClient } from '@/services/WordPressClient';
import Navigation from './Navigation';

export default async function Header() {
  const navigation = await wordPressClient.menu.getMenu('navigation');

  return (
    <header>
      <Navigation menuItems={navigation} />
    </header>
  );
}
