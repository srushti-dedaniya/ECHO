import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { MobileNavigation } from './MobileNavigation';
import { EchoProvider } from '../../context/EchoContext';
import { UserProvider } from '../../context/UserContext';

export function AppLayout() {
  return (
    <EchoProvider>
      <UserProvider>
        <div className="min-h-screen bg-background">
          <Navbar />
          <MobileNavigation />
          <main className="w-full pt-16 bg-background relative z-20 min-h-screen">
            <Outlet />
          </main>
        </div>
      </UserProvider>
    </EchoProvider>
  );
}