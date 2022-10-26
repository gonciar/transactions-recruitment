import { render, screen } from '@testing-library/react';
import App from './App';

test('renders bank recruitment task link', () => {
  render(<App />);
  const linkElement = screen.getByText(/bank recruitment task/i);
  expect(linkElement).toBeInTheDocument();
});
