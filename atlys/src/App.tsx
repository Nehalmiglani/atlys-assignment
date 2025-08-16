import { useState } from "react";
import { AuthProvider } from "./context/auth-context";
import FeedPage from "./components/feed/feed-page";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/feed/Header/header";
import AuthContainer from "./components/auth/AuthContainer/auth-container";

export type AuthMode = "signin" | "signup";

function App() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("signin");

  const location = useLocation();
  const isAuthPage =
    location.pathname === "/sign-in" || location.pathname === "/sign-up";

  const handleAuthRequired = (mode: AuthMode = "signin") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleAuthModalClose = () => {
    setAuthModalOpen(false);
  };

  return (
    <AuthProvider>
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#FFFFFF",
          overflowY: "auto",
          position: "relative",
        }}
      >
        <Header onAuthRequired={handleAuthRequired} />
        <Routes>
          {/* Public routes */}
          <Route
            path="/home"
            element={<FeedPage onAuthRequired={handleAuthRequired} />}
          />
          <Route
            path="/sign-in"
            element={<AuthContainer mode={"signin"} variant="card" />}
          />
          <Route
            path="/sign-up"
            element={<AuthContainer mode={"signup"} variant="card" />}
          />

          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>

        {!isAuthPage && (
          <AuthContainer
            variant="modal"
            open={authModalOpen}
            onClose={handleAuthModalClose}
            mode={authMode}
          />
        )}
      </div>
    </AuthProvider>
  );
}

export default App;
