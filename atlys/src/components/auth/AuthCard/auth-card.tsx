import { useState } from "react";
import styles from "./auth-card.module.css";
import { useAuth } from "../../../context/auth-context";
import type { AuthMode } from "../../../types";
import { Login } from "@mui/icons-material";

interface AuthCardProps {
  mode?: AuthMode;
  onAuthSuccess?: () => void;
}

export default function AuthCard({ mode, onAuthSuccess }: AuthCardProps) {
  const { login, register, isLoading } = useAuth();
  const [authMode, setAuthMode] = useState<AuthMode>(mode ?? "signin");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
      setSubmitError("");
    };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (authMode === "signup" && !formData.name) {
      newErrors.name = "Name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateForm()) return;

    try {
      let success = false;

      if (authMode === "signin") {
        success = await login(formData.email, formData.password);
        if (!success) {
          setSubmitError("Invalid email or password");
        } else if (onAuthSuccess) {
          onAuthSuccess();
        }
      } else {
        success = await register(
          formData.email,
          formData.password,
          formData.name
        );
        if (!success) {
          setSubmitError("User already exists or registration failed");
        } else if (onAuthSuccess) {
          onAuthSuccess();
        }
      }
    } catch (error) {
      setSubmitError("An unexpected error occurred");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.headerSection}>
          <div className={styles.iconContainer}>
            <Login className={styles.icon} />
          </div>
          <h2 className={styles.title}>
            {authMode === "signin"
              ? "Sign in to continue"
              : "Create your account"}
          </h2>
          <p className={styles.description}>
            {authMode === "signin"
              ? "Sign in to access all the features on this app"
              : "Join us to get started with all features"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {authMode === "signup" && (
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange("name")}
                disabled={isLoading}
                className={`${styles.input} ${
                  errors.name ? styles.inputError : ""
                }`}
              />
              {errors.name && <p className={styles.errorText}>{errors.name}</p>}
            </div>
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email or username
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email or username"
              value={formData.email}
              onChange={handleInputChange("email")}
              disabled={isLoading}
              className={`${styles.input} ${
                errors.email ? styles.inputError : ""
              }`}
            />
            {errors.email && <p className={styles.errorText}>{errors.email}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange("password")}
              disabled={isLoading}
              className={`${styles.input} ${
                errors.password ? styles.inputError : ""
              }`}
            />
            {errors.password && (
              <p className={styles.errorText}>{errors.password}</p>
            )}
          </div>

          {submitError && <div className={styles.alert}>{submitError}</div>}

          <button
            type="submit"
            disabled={isLoading}
            className={styles.submitButton}
          >
            {isLoading
              ? "Loading..."
              : authMode === "signin"
              ? "Sign In"
              : "Create Account"}
          </button>
        </form>
      </div>

      <div className={styles.footer}>
        <p className={styles.footerText}>
          {authMode === "signin"
            ? "Don't have an account? "
            : "Already have an account? "}
          <button
            type="button"
            onClick={() =>
              setAuthMode(authMode === "signin" ? "signup" : "signin")
            }
            className={styles.toggleButton}
          >
            {authMode === "signin" ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
}
