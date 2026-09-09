import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const TestComponent = () => {
  const { user, login, register, logout, demoLogin, isAuthenticated, isLoading, setUser } = useAuth();
  return (
    <div>
      <div data-testid="user-name">{user?.name || 'none'}</div>
      <div data-testid="user-email">{user?.email || 'none'}</div>
      <div data-testid="authenticated">{String(isAuthenticated)}</div>
      <div data-testid="loading">{String(isLoading)}</div>
      <button onClick={() => login('test@test.com')}>Login</button>
      <button onClick={() => register({ name: 'Test', username: 'test', email: 'test@test.com', password: 'pass' })}>Register</button>
      <button onClick={logout}>Logout</button>
      <button onClick={demoLogin}>Demo</button>
      <button onClick={() => setUser(null)}>Clear User</button>
    </div>
  );
};

const renderWithAuth = () => render(
  <AuthProvider>
    <TestComponent />
  </AuthProvider>
);

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('shows unauthenticated state initially', () => {
    renderWithAuth();
    expect(screen.getByTestId('authenticated')).toHaveTextContent('false');
    expect(screen.getByTestId('user-name')).toHaveTextContent('none');
    expect(screen.getByTestId('loading')).toHaveTextContent('false');
  });

  it('allows demo login', async () => {
    renderWithAuth();
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
    });
    fireEvent.click(screen.getByText('Demo'));
    await waitFor(() => {
      expect(screen.getByTestId('authenticated')).toHaveTextContent('true');
      expect(screen.getByTestId('user-name')).toHaveTextContent('Demo Explorer');
    });
  });

  it('allows registration', async () => {
    renderWithAuth();
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
    });
    fireEvent.click(screen.getByText('Register'));
    await waitFor(() => {
      expect(screen.getByTestId('authenticated')).toHaveTextContent('true');
    });
  });

  it('allows login', async () => {
    renderWithAuth();
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
    });
    fireEvent.click(screen.getByText('Login'));
    await waitFor(() => {
      expect(screen.getByTestId('authenticated')).toHaveTextContent('true');
    });
  });

  it('allows logout', async () => {
    renderWithAuth();
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
    });
    fireEvent.click(screen.getByText('Demo'));
    await waitFor(() => {
      expect(screen.getByTestId('authenticated')).toHaveTextContent('true');
    });
    fireEvent.click(screen.getByText('Logout'));
    await waitFor(() => {
      expect(screen.getByTestId('authenticated')).toHaveTextContent('false');
    });
  });

  it('clears user with setUser(null)', async () => {
    renderWithAuth();
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
    });
    fireEvent.click(screen.getByText('Demo'));
    await waitFor(() => {
      expect(screen.getByTestId('authenticated')).toHaveTextContent('true');
    });
    fireEvent.click(screen.getByText('Clear User'));
    await waitFor(() => {
      expect(screen.getByTestId('authenticated')).toHaveTextContent('false');
    });
  });
});