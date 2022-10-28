import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Your bank transactions list', () => {
  render(<App />);
  const linkElement = screen.getByText(/Your bank transactions list/i);
  expect(linkElement).toBeInTheDocument();
});
