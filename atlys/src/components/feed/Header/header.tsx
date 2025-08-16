import { useState } from "react";
import { Logout, Logout as LogoutIcon } from "@mui/icons-material";
import { useAuth } from "../../../context/auth-context";
import styles from  '../Header/header.module.css';

interface HeaderProps {
  onAuthRequired: (mode?: "signin" | "signup") => void;
}

export default function Header({ onAuthRequired }: HeaderProps) {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  return (
    <div className={styles.header}>
      <div className={styles.toolbar}>
        <div className={styles.logoContainer}>
          <span className={styles.logo}>foo-rum</span>
        </div>

        {user ? (
          <div className={styles.userSection}>
            <span className={`${styles.welcomeText} ${window.innerWidth < 600 ? styles.welcomeTextHidden : ""}`}>
              Welcome, {user.name}
            </span>
            <button onClick={handleMenuOpen} className={styles.avatarButton}>
              <div className={styles.avatar}>{user.name.charAt(0).toUpperCase()}</div>
            </button>
            {anchorEl && (
              <div className={styles.dropdown}>
                <button onClick={handleLogout} className={styles.logoutButton}>
                  <LogoutIcon className={styles.logoutIcon} />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => onAuthRequired("signin")} className={styles.loginButton}>
            Login
            <Logout className={styles.icon} />
          </button>
        )}
      </div>
    </div>
  )
}
