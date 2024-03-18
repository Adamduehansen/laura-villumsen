import Col from './Col';
import Container from './Container';
import Row from './Row';

type Props<TItem> = {
  renderItem: (item: TItem) => React.ReactNode;
  list: TItem[];
};

export default function WorkList<TItem>({ list, renderItem }: Props<TItem>) {
  return (
    <Container fluid>
      <Row className='gap-2'>
        {list.map((item, index): JSX.Element => {
          return (
            <Col
              lg={(index + 1) % 3 === 0 ? 12 : 6}
              key={index}
              className='relative'
            >
              {renderItem(item)}
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
