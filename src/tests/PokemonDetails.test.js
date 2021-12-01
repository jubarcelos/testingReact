import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test PokemonDetails from App', () => {
  it('deve mostrar subtitle Summary, detalhes do pokemom e sem button details', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);
    const pikachuName = screen.getByRole('heading',
      { level: 2, name: 'Pikachu Details' });
    expect(pikachuName).toBeInTheDocument();
    const subTitle = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(moreDetails).not.toBeInTheDocument();
    expect(subTitle).toBeInTheDocument();
    const paragraph = screen.getByText(/This intelligent Pokémon roasts hard berries/i);
    expect(paragraph).toBeInTheDocument();
  });
  it('deve mostrar h2 Game Locations of Pikachu e os mapas do pokemom', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);
    const mapTitle = screen.getByRole('heading',
      { level: 2, name: 'Game Locations of Pikachu' });
    expect(mapTitle).toBeInTheDocument();
    const local1 = screen.getByText(/Kanto Viridian Forest/i);
    const local2 = screen.getByText(/Kanto Power Plant/i);
    expect(local2).toBeInTheDocument();
    expect(local1).toBeInTheDocument();
    const localImg = screen.getAllByRole('img', { name: /Pikachu location/i });
    expect(localImg[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(localImg[0]).toHaveAttribute('alt', 'Pikachu location');
    expect(localImg[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(localImg[1]).toHaveAttribute('alt', 'Pikachu location');
  });
  it('deve mostrar se favorita e desfavorita o pokemom', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);
    const favoritado = screen.getByRole('checkbox', { name: /pokémon favoritado?/i });
    userEvent.click(favoritado);
    const Img = screen.getByRole('img', { name: /Pikachu is marked as favorit/i });
    expect(Img).toHaveAttribute('src', '/star-icon.svg');
    expect(Img).toBeInTheDocument();
    userEvent.click(favoritado);
    expect(Img).not.toBeInTheDocument();
  });
});
