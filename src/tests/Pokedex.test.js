import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test Pokedex page', () => {
  it('deve conter h2: Encountered pokémons', () => {
    const { history } = renderWithRouter(<App />);
    const subTitle = screen.getByRole('heading',
      { level: 2, name: 'Encountered pokémons' });
    expect(subTitle).toBeInTheDocument();
  });

  it('mostra o próximo pokemon quando button proximo pokemon é clicado', () => {
    renderWithRouter(<App />);
    const img1 = screen.getAllByRole('img', { name: 'Pikachu sprite' });
    const button = screen.getByRole('button', { name: 'Próximo Pokémon' });
    userEvent.click(button);
    const img2 = screen.getAllByRole('img', { name: 'Charmander sprite' });
    expect(img1).not.toBeEqual(img2);
  });
});
