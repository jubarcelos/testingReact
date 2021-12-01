import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test NotFound page', () => {
  it('deve conter h2: Page requested not found 😭 ', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/julia');
    const title = screen.getByRole('heading',
      { level: 2, name: 'Page requested not found Crying emoji' });
    expect(title).toBeInTheDocument();
  });

  it('mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/julia');
    const notFound = screen.getByAltText(/Pikachu crying because/i);
    expect(notFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
