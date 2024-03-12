import { wordPressClient } from '@/services/WordPressClient';
import Socials from './Socials';

export default async function Footer(): Promise<JSX.Element> {
  const socials = await wordPressClient.menu.getMenu('socials');

  return (
    <footer>
      <Socials menuItem={socials} />
    </footer>
  );
}
