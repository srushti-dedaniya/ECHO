import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UniverseConsole } from '../../components/universe/UniverseConsole';
import { EchoProvider } from '../../context/EchoContext';
import { AuthProvider } from '../../context/AuthContext';
import { UserProvider } from '../../context/UserContext';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const renderWithProviders = () => render(
  <AuthProvider>
    <UserProvider>
      <EchoProvider>
        <UniverseConsole />
      </EchoProvider>
    </UserProvider>
  </AuthProvider>
);

describe('UniverseConsole', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders console with three tabs', () => {
    renderWithProviders();
    expect(screen.getByText('LIVE')).toBeInTheDocument();
    expect(screen.getByText('MOOD')).toBeInTheDocument();
    expect(screen.getByText('SIGNAL')).toBeInTheDocument();
  });

  it('shows live echoes in LIVE tab', () => {
    renderWithProviders();
    expect(screen.getByText('HAPPENING NOW')).toBeInTheDocument();
  });

  it('can switch to MOOD tab', async () => {
    renderWithProviders();
    fireEvent.click(screen.getByText('MOOD'));
    await waitFor(() => {
      expect(screen.getByText('THE WORLD FEELS...')).toBeInTheDocument();
    });
  });

  it('can switch to SIGNAL tab', async () => {
    renderWithProviders();
    fireEvent.click(screen.getByText('SIGNAL'));
    await waitFor(() => {
      expect(screen.getByText('LIVE ECHOES')).toBeInTheDocument();
    });
  });

  it('can minimize', () => {
    renderWithProviders();
    const minimizeBtn = screen.getByLabelText('Minimize console');
    fireEvent.click(minimizeBtn);
    expect(screen.getByText('ECHO CONSOLE')).toBeInTheDocument();
  });

  it('can hide and show reopen button', () => {
    renderWithProviders();
    const hideBtn = screen.getByLabelText('Hide console');
    fireEvent.click(hideBtn);
    expect(screen.getByLabelText('Open Universe Console')).toBeInTheDocument();
  });
});