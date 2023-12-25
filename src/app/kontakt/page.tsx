import Col from '@/components/Col';
import Container from '@/components/Container';
import Row from '@/components/Row';
import { wordPressClient } from '@/services/WordPressClient';
import parse from 'node-html-parser';

export default async function Contact(): Promise<JSX.Element> {
  const { data } = await wordPressClient.getPageData('/kontakt');

  if (data.content === null) {
    throw new Error('Redirect to 404');
  }

  const root = parse(data.content);
  const [intro, contactInfo] = root.querySelectorAll('p');

  return (
    <div className='pt-main'>
      <Container>
        <Row>
          <Col lgStart={6} lg={6} lgOrder={2}>
            <p
              className='mb-6 text-[2rem] leading-9'
              dangerouslySetInnerHTML={{
                __html: contactInfo.innerHTML,
              }}
            ></p>
          </Col>
          <Col lgStart={2} lg={3} lgOrder={1}>
            <p
              className='text-sm'
              dangerouslySetInnerHTML={{
                __html: intro.innerHTML,
              }}
            ></p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
