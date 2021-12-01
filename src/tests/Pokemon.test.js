import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

// const pokemom = {
//   id: 25,
//   name: 'Pikachu',
//   type: 'Electric',
//   averageWeight: {
//     value: '6.0',
//     measurementUnit: 'kg',
//   },
//   image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
//   moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
//   foundAt: [
//     {
//       location: 'Kanto Viridian Forest',
//       map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
//     },
//     {
//       location: 'Kanto Power Plant',
//       map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
//     },
//   ],
//   summary: 'This intelligent Pokémon roasts hard berries...',
// };

describe('Test Pokemon page', () => {
  it('dados renderizados do pokémom', () => {
    renderWithRouter(<Pokemon isFavorite pokemon={ pokemons[0] } />);
    const pikachuName = screen.getByTestId('pokemon-name');
    expect(pikachuName).toHaveTextContent(pokemons[0].name);
    const pikachuType = screen.getByText(/electric/i);
    expect(pikachuType).toHaveTextContent(pokemons[0].type);
    const pikachuAverage = screen.getByText(/Average/i);
    expect(pikachuAverage).toHaveTextContent(pokemons[0].averageWeight.value);
    expect(pikachuAverage).toHaveTextContent(pokemons[0].averageWeight.measurementUnit);
    const pikachuImg = screen.getByRole('img', { name: /Pikachu sprite/i });
    expect(pikachuImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('deve conter o link more details', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[1] } isFavorite />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    expect(moreDetails).toHaveAttribute('href', '/pokemons/4');
  });
  it('deve conter o link more details e a url de details conter o id do pokemom', () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ pokemons[1] } isFavorite />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    userEvent.click(moreDetails);
    expect(history.entries[1].pathname).toEqual('/pokemons/4');
  });
  it('deve mostrar a imagem da estrela nos pokemons favoritados', () => {
    const isFavorite = true;
    renderWithRouter(<Pokemon isFavorite={ isFavorite } pokemon={ pokemons[0] } />);
    const pikachuImg = screen.getByRole('img',
      { name: /Pikachu is marked as favorite/i });
    expect(pikachuImg).toHaveAttribute('src', '/star-icon.svg');
    expect(pikachuImg).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});

// ajuda da Fernanda Andrade para conhecer o entries e pegar o pathname das mudanças.
