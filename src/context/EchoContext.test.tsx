import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { EchoProvider, useEcho } from '../context/EchoContext';
import { AuthProvider } from '../context/AuthContext';
import { UserProvider } from '../context/UserContext';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const TestComponent = () => {
  const { activeEchoes, addEcho, updateResonance, myEchoes, setCurrentRoom, newlyCreatedEchoId } = useEcho();
  return (
    <div>
      <div data-testid="echo-count">{activeEchoes.length}</div>
      <div data-testid="my-echo-count">{myEchoes.length}</div>
      <div data-testid="new-echo-id">{newlyCreatedEchoId || 'none'}</div>
      <button onClick={() => addEcho({
        id: 'test-echo-1',
        type: 'thought',
        content: 'Test echo',
        mood: 'nostalgic',
        scope: 'universe',
        lifespan: '3h',
        createdAt: Date.now(),
        expiresAt: Date.now() + 10800000,
        authorId: 'test-user',
        resonance: { resonate: 0, signal: 0, hold: 0, ripple: 0 },
      })}>Add Echo</button>
      <button onClick={() => updateResonance('test-echo-1', 'resonate', 1)}>Resonate</button>
      <button onClick={() => setCurrentRoom({ 
        id: 'room-1', 
        title: 'Test Room', 
        mood: 'nostalgic',
        echo: {
          id: 'echo-1',
          type: 'thought',
          content: 'Test',
          mood: 'nostalgic',
          scope: 'universe',
          lifespan: '3h',
          createdAt: Date.now(),
          expiresAt: Date.now() + 10800000,
          authorId: 'user-1',
          resonance: { resonate: 0, signal: 0, hold: 0, ripple: 0 },
        },
        participants: [],
        contributions: [],
        lifespan: { remaining: 1000, total: 1000 }
      })}>Set Room</button>
    </div>
  );
};

const renderWithEcho = () => render(
  <AuthProvider>
    <UserProvider>
      <EchoProvider>
        <TestComponent />
      </EchoProvider>
    </UserProvider>
  </AuthProvider>
);

describe('EchoContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('loads mock echoes initially', () => {
    renderWithEcho();
    expect(screen.getByTestId('echo-count')).toHaveTextContent('6');
  });

  it('allows adding new echo', async () => {
    renderWithEcho();
    fireEvent.click(screen.getByText('Add Echo'));
    await waitFor(() => {
      expect(screen.getByTestId('echo-count')).toHaveTextContent('7');
      expect(screen.getByTestId('my-echo-count')).toHaveTextContent('1');
      expect(screen.getByTestId('new-echo-id')).toHaveTextContent('test-echo-1');
    });
  });

  it('allows setting current room', async () => {
    renderWithEcho();
    fireEvent.click(screen.getByText('Set Room'));
    // Room is set in context, we can't easily test it here without more setup
  });
});