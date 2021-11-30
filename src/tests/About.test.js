import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import About from '../components/About';

test('renderiza a page about e mostra o título', () => {
  renderWithRouter(<About />);
  const title = screen.getByRole('heading',
    { level: 2, name: 'About Pokédex' });
  expect(title).toBeInTheDocument();
});

test('mostra o primeiro paragrafo', () => {
  renderWithRouter(<About />);
  const paragrafo = screen.getAllByText(/Pokédex/i);
  expect(paragrafo.length).toBe(2);
});

test('mostra a imagem https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
  renderWithRouter(<About />);
  const img = screen.getByRole('img');
  expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});

// referencia: https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
