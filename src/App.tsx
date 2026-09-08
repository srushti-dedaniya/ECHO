import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { EchoProvider } from './context/EchoContext'
import { UserProvider } from './context/UserContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { Navigation } from './components/navigation/Navigation'
import { LandingPage } from './pages/LandingPage'
import { UniversePage } from './pages/UniversePage'
import { EchoRoomPage } from './pages/EchoRoomPage'
import { ReleaseMomentPage } from './pages/ReleaseMomentPage'
import { OnboardingPage } from './pages/OnboardingPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { MomentsPage } from './pages/MomentsPage'
import { ProfilePage } from './pages/ProfilePage'
import { ToastProvider } from './components/ui/Toast'
import { GlobalTelemetry } from './components/common/GlobalTelemetry'

function AppRoutes() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/universe" replace /> : <LoginPage />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/universe" replace /> : <RegisterPage />} />
      
      <Route
        path="/onboarding"
        element={
          <ProtectedRoute>
            <OnboardingPage />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/universe"
        element={
          <ProtectedRoute>
            <UniversePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/echo/:id"
        element={
          <ProtectedRoute>
            <EchoRoomPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/release"
        element={
          <ProtectedRoute>
            <ReleaseMomentPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/moments"
        element={
          <ProtectedRoute>
            <MomentsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <AuthProvider>
      <UserProvider>
        <EchoProvider>
          <ToastProvider>
            <BrowserRouter>
              <Navigation />
              <AppRoutes />
              {!isLoading && isAuthenticated && <GlobalTelemetry />}
            </BrowserRouter>
          </ToastProvider>
        </EchoProvider>
      </UserProvider>
    </AuthProvider>
  )
}

export default App