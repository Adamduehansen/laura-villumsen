import Col, { ColRange } from './Col';
import Container from './Container';
import Row from './Row';

type Pattern = '2-1' | '1-2';

type Props<TItem> = {
  renderItem: (item: TItem) => React.ReactNode;
  list: TItem[];
  pattern: Pattern;
};

function getColumnSize(index: number, pattern: Pattern): ColRange | never {
  switch (pattern) {
    case '2-1':
      return (index + 1) % 3 === 0 ? 12 : 6;
    case '1-2':
      return index % 3 === 0 ? 12 : 6;
  }
}

export default function WorkList<TItem>({
  list,
  renderItem,
  pattern,
}: Props<TItem>) {
  return (
    <Container fluid>
      <Row className='gap-2'>
        {list.map((item, index): JSX.Element => {
          return (
            <Col
              lg={getColumnSize(index, pattern)}
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
