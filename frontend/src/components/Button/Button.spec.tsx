import { Button } from '.';
import { screen, render } from '@testing-library/react';

describe('Button', () => {
  it('Renders the button', () => {
    render(<Button />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('Renders the button text', () => {
    render(<Button>content19283uyeqoiwd</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('content19283uyeqoiwd');
  });
});
