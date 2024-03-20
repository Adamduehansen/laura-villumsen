import Col from '@/components/Col';
import Container from '@/components/Container';
import Row from '@/components/Row';

export default async function NotFound() {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Siden kunne ikke findes</h1>
        </Col>
      </Row>
    </Container>
  );
}
