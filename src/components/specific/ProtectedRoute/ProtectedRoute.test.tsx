import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { ProtectedRoute } from './';

describe('ProtectedRoute', () => {
  it('renders children when user is admin and logged in', () => {
    sessionStorage.setItem(
      'user',
      JSON.stringify({
        id: '9f55',
        username: 'sanjeev123',
        firstName: 'Sanjeev',
        lastName: 'Gunasekaran',
        role: 'admin',
      })
    );

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <ProtectedRoute>
          <div data-testid="protected-content">Protected Content</div>
        </ProtectedRoute>
        <Route path="/login">
          <div data-testid="login-page">Login Page</div>
        </Route>
      </MemoryRouter>
    );

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    expect(screen.queryByTestId('login-page')).not.toBeInTheDocument();
  });

  it('redirects to login page when user is not logged in', () => {
    sessionStorage.removeItem('user');

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <ProtectedRoute>
          <div data-testid="protected-content">Protected Content</div>
        </ProtectedRoute>
        <Route path="/login">
          <div data-testid="login-page">Login Page</div>
        </Route>
      </MemoryRouter>
    );

    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });

  it('redirects to login page when user is not an admin', () => {
    sessionStorage.setItem(
      'user',
      JSON.stringify({
        id: '9f55',
        username: 'user123',
        firstName: 'Regular',
        lastName: 'User',
        role: 'user',
      })
    );

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <ProtectedRoute>
          <div data-testid="protected-content">Protected Content</div>
        </ProtectedRoute>
        <Route path="/login">
          <div data-testid="login-page">Login Page</div>
        </Route>
      </MemoryRouter>
    );

    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });
});
