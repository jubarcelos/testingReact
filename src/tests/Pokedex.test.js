import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Test Pokedex page', () => {
  beforeEach(() => renderWithRouter(<App />));
  it('deve conter h2: Encountered pokémons', () => {
    const subTitle = screen.getByRole('heading',
      { level: 2, name: 'Encountered pokémons' });
    expect(subTitle).toBeInTheDocument();
  });

  it('mostra o próximo pokemon quando button proximo pokemon é clicado', () => {
    const button = screen.getByRole('button', { name: 'Próximo pokémon' });
    pokemons.forEach((pokemon) => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
      userEvent.click(button);
    });
    expect(screen.getByText(pokemons[0].name)).toBeInTheDocument();
  });

  it('deve mostrar apenas um pokemon por vez', () => {
    expect(screen.getByText(pokemons[0].name)).toBeInTheDocument();
    expect(screen.queryByText(pokemons[1].name)).not.toBeInTheDocument();
  });

  it('deve ter 1 button para cada type de pokemon além do All e Próximo pokemon', () => {
    const SETE = 7;
    const btnTypeQuantity = screen.queryAllByTestId(/pokemon-type-button/i).length;
    expect(btnTypeQuantity).toBe(SETE);
  });

  it('deve conter apenas os pokemons do type do button', () => {
    const allButtons = screen.getAllByTestId('pokemon-type-button');
    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();

    const buttonElectric = screen.getByRole('button', { name: /electric/i });
    expect(buttonElectric).toBeInTheDocument();
    userEvent.click(buttonElectric);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();

    const buttonFire = screen.getByRole('button', { name: /fire/i });
    expect(buttonFire).toBeInTheDocument();
    userEvent.click(buttonFire);
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();

    const buttonBug = screen.getByRole('button', { name: /bug/i });
    expect(buttonBug).toBeInTheDocument();
    userEvent.click(buttonBug);
    expect(screen.getByText(/caterpie/i)).toBeInTheDocument();

    const buttonPoison = screen.getByRole('button', { name: /poison/i });
    expect(buttonPoison).toBeInTheDocument();
    userEvent.click(buttonPoison);
    expect(screen.getByText(/ekans/i)).toBeInTheDocument();

    const buttonPsychic = screen.getByRole('button', { name: /psychic/i });
    expect(buttonPsychic).toBeInTheDocument();
    userEvent.click(buttonPsychic);
    expect(screen.getByText(/alakazam/i)).toBeInTheDocument();

    const buttonNormal = screen.getByRole('button', { name: /normal/i });
    expect(buttonNormal).toBeInTheDocument();
    userEvent.click(buttonNormal);
    expect(screen.getByText(/snorlax/i)).toBeInTheDocument();
    expect(buttonNormal).toBeInTheDocument();

    const buttonDragon = screen.getByRole('button', { name: /dragon/i });
    expect(buttonDragon).toBeInTheDocument();
    userEvent.click(buttonDragon);
    expect(screen.getByText(/dragonair/i)).toBeInTheDocument();
  });
});
