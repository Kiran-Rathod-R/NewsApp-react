import { render, screen } from '@testing-library/react';
import App from './App';

test('renders News title in header', () => {
  render(<App />);
  const titleElement = screen.getByText(/News/i);
  expect(titleElement).toBeInTheDocument();
});

