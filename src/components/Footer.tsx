import { wordPressClient } from '@/services/WordPressClient';
import Socials from './Socials';

export default async function Footer(): Promise<JSX.Element> {
  const socials = await wordPressClient.menu.getMenu('socials');
  const inquiries = await wordPressClient.meta.getInquiriesText();

  return (
    <footer className='bg-[#D9D9D9]'>
      <p>{inquiries}</p>
      <div>
        <Socials menuItem={socials} />
        <button>To the top</button>
      </div>
      <div>
        <p>©2024</p>
      </div>
      <div>
        <p>Design by Laura Villumsen</p>
        <p>Coded by Adam Due Hansen</p>
      </div>
    </footer>
  );
}
