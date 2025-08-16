import type { AuthMode } from "../../../types";
import { useNavigate } from "react-router-dom";
import AuthCard from "../AuthCard/auth-card";

interface AuthContainerProps {
  variant?: "modal" | "card";
  open?: boolean;
  onClose?: () => void;
  mode?: AuthMode;
}

export default function AuthContainer({
  variant = "card",
  open = false,
  mode,
  onClose = () => {},
}: AuthContainerProps) {
  const navigate = useNavigate();
  if (variant === "card") {
    return (
      <div
        style={{
          minHeight: "95dvh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <div style={{
          minWidth:'458px'
        }}>

        <AuthCard
          mode={mode}
          onAuthSuccess={() => {
            navigate("/home");
          }}
          />
          </div>
      </div>
    );
  }
  return (
    <div
      style={{
        position: "fixed",
        zIndex:1100,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        transition: "opacity 300ms ease-in-out",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "28rem",
        }}
      >
        <AuthCard
          mode={mode}
          onAuthSuccess={() => {
            onClose();
          }}
        />
      </div>
    </div>
  );
}
