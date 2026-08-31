import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import "./AuthPage.css";

export default function AuthPage() {
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password strength checker
  const checkPasswordStrength = (password) => {
    if (password.length < 6) return { strength: "weak", color: "#ef4444" };
    if (password.length < 10 && /(?=.*[a-z])(?=.*[A-Z])/.test(password)) 
      return { strength: "medium", color: "#f59e0b" };
    if (password.length >= 10 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) 
      return { strength: "strong", color: "#10b981" };
    return { strength: "weak", color: "#ef4444" };
  };

  // Handle password change with strength indicator
  const handlePasswordChange = (value) => {
    setRegisterPassword(value);
    if (value) {
      const result = checkPasswordStrength(value);
      setPasswordStrength(result);
    } else {
      setPasswordStrength("");
    }
  };

  const handleRegister = async(e) => {
    e.preventDefault();
    setErrors({});
    setMessage("");

    // Validation
    const newErrors = {};
    if (!registerName.trim()) newErrors.registerName = "Name is required";
    if (!validateEmail(registerEmail)) newErrors.registerEmail = "Invalid email format";
    if (registerPassword.length < 6) newErrors.registerPassword = "Password must be at least 6 characters";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://postbloging.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: registerName,
          email: registerEmail,
          password: registerPassword,
        }),
      });
      const result = await response.json();
      setMessage(result.message);
      if (response.ok) {
        // Clear form on success
        setRegisterName("");
        setRegisterEmail("");
        setRegisterPassword("");
        setPasswordStrength("");
      }
    } catch (err) {
      setMessage("An error occurred at registration");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async(e) =>{
    e.preventDefault();
    setErrors({});
    setMessage("");

    // Validation
    const newErrors = {};
    if (!validateEmail(loginEmail)) newErrors.loginEmail = "Invalid email format";
    if (!loginPassword) newErrors.loginPassword = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try{
          const response = await fetch('https://postbloging.onrender.com/api/auth/login',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: loginEmail, password: loginPassword}) 
          })

          const result = await response.json();
          if(result.token){
            localStorage.setItem('token',result.token);
            localStorage.setItem('userName', result.name || loginEmail.split('@')[0]);
            navigate('/')
          }
          else{
            setMessage(result.message);
          }
    }
    catch(error){
      setMessage("An error occurred at login");
    } finally {
      setLoading(false);
    }
  }

  

  return (
    <div className="auth-body">
      <div className="auth-header">
        <h1>📝 PostBloging</h1>
        <p>Share your thoughts with the world</p>
      </div>
      
      <div className="auth-container">
       
        <div className="form-section authform">
          <h2>✨ Register</h2>
          <form onSubmit={handleRegister}>
            <div className="input-group">
              <span className="input-icon">👤</span>
              <input
                type="text"
                placeholder="Your Name"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                className={errors.registerName ? "error" : ""}
              />
            </div>
            {errors.registerName && <p className="error-msg">{errors.registerName}</p>}
            
            <div className="input-group">
              <span className="input-icon">✉️</span>
              <input
                type="email"
                placeholder="Your Email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                className={errors.registerEmail ? "error" : ""}
              />
            </div>
            {errors.registerEmail && <p className="error-msg">{errors.registerEmail}</p>}
            
            <div className="input-group">
              <span className="input-icon">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Your Password"
                value={registerPassword}
                onChange={(e) => handlePasswordChange(e.target.value)}
                className={errors.registerPassword ? "error" : ""}
              />
              <span 
                className="toggle-password" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>
            {errors.registerPassword && <p className="error-msg">{errors.registerPassword}</p>}
            
            {passwordStrength && (
              <div className="password-strength">
                <div 
                  className="strength-bar" 
                  style={{ 
                    width: passwordStrength.strength === 'weak' ? '33%' : 
                           passwordStrength.strength === 'medium' ? '66%' : '100%',
                    backgroundColor: passwordStrength.color 
                  }}
                />
                <p style={{ color: passwordStrength.color }}>
                  {passwordStrength.strength.toUpperCase()}
                </p>
              </div>
            )}
            
            <button type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>

        <div className="form-section authform">
          <h2>🔐 Login</h2>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <span className="input-icon">✉️</span>
              <input
                type="email"
                placeholder="Your Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className={errors.loginEmail ? "error" : ""}
              />
            </div>
            {errors.loginEmail && <p className="error-msg">{errors.loginEmail}</p>}
            
            <div className="input-group">
              <span className="input-icon">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Your Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className={errors.loginPassword ? "error" : ""}
              />
              <span 
                className="toggle-password" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>
            {errors.loginPassword && <p className="error-msg">{errors.loginPassword}</p>}
            
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>

        {message && (
          <div className={`message ${message.includes("success") ? "success" : "error"}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
