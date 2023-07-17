import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Col from './Col';

describe('Col', () => {
  test('Should set "col-span-12" as default', () => {
    // Arrange
    const { container } = render(<Col>Any Children</Col>);

    // Act
    const div = container.firstChild;

    // Assert
    expect(div).toHaveClass('col-span-12');
  });

  test('should set "col-span" class from props.sm', () => {
    // Arrange
    const { container } = render(<Col sm={6}>Any Children</Col>);

    // Act
    const div = container.firstChild;

    // Assert
    expect(div).toHaveClass('col-span-6');
  });
});
