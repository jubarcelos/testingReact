import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Test Favorite page', () => {
  it('deve checar se aparece a mensagem quando não tem pokemon', () => {
    renderWithRouter(<FavoritePokemons />);
    const favoritePokemons = screen.getByText(/No favorite pokemon found/i);
    expect(favoritePokemons).toBeInTheDocument();
  });
  it('deve exibir todos os cards de pokemons favoritados', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);
    const favoritado = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
    userEvent.click(favoritado);
    const favoritedPokemons = screen.getByRole('link', { name: /Favorite/i });
    userEvent.click(favoritedPokemons);
    const pokemon = screen.getByText(/average/i);
    expect(pokemon).toBeDefined();
  });
});
