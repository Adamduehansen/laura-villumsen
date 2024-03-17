import { wordPressClient } from '@/services/WordPressClient';
import Navigation from './Navigation';

export default async function Header() {
  const navigation = await wordPressClient.menu.getMenu('navigation');

  return (
    <header className='flex justify-between py-12'>
      <p>Laura Villumsen</p>
      <p className='hidden lg:block'>Portfolio</p>
      <Navigation menuItems={navigation} />
    </header>
  );
}
