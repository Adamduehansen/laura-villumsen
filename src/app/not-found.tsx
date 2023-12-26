import Container from '@/components/Container';
import { wordPressClient } from '@/services/WordPressClient';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await wordPressClient.getPageData('/');

  return {
    title: `Siden kunne ikke findes | ${data.siteName}`,
  };
}

export default async function NotFound() {
  return (
    <div className='pt-main'>
      <Container>
        <h1>Siden kunne ikke findes!</h1>
      </Container>
    </div>
  );
}
