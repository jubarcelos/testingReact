import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

it('deve renderizar o componente App e checar a existencia dos links', () => {
  renderWithRouter(<App />);
  const homeLink = screen.getByRole('link', { name: /Home/i });
  expect(homeLink).toBeInTheDocument();

  const aboutLink = screen.getByRole('link', { name: /about/i });
  expect(aboutLink).toBeInTheDocument();

  const favoritesLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
  expect(favoritesLink).toBeInTheDocument();
});

it('deve verificar a rota do link home', () => {
  const { history } = renderWithRouter(<App />);
  const homeLink = screen.getByRole('link', { name: /home/i });
  const { pathname } = history.location;
  userEvent.click(homeLink);
  expect(pathname).toBe('/');
});
it('deve verificar a rota do link about', () => {
  const { history } = renderWithRouter(<App />);
  const aboutLink = screen.getByRole('link', { name: /about/i });
  userEvent.click(aboutLink);
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

it('deve verificar a rota do link favorites', () => {
  const { history } = renderWithRouter(<App />);
  const favoritesLink = screen.getByRole('link', { name: /Favorite/i });
  expect(favoritesLink).toBeInTheDocument();

  userEvent.click(favoritesLink);
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

it('deve verificar a rota do link NotFound', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/julia');
  const title = screen.getByRole('heading',
    { level: 2, name: 'Page requested not found Crying emoji' });
  expect(title).toBeInTheDocument();
});
