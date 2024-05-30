import React, { useState } from "react";
import "./loginPage.css";
import SignIg from "./subComponents/signIn/SignIn";
import useHookLogin from "./utils/useHookLogin.js";

const LoginPage = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    errorLogin,
    handleLogin,
    isLoading,
} = useHookLogin();

const [isSignIn, setIsSignIn] = useState(false);

  return (
    <div className="login-page">
      <div className="container-one">
        <h1 className="title-notes">Mis Notas</h1>
      </div>
      <div className="container-two">
        <h1 className="title-login">¡Bienvenido!</h1>
        {isSignIn ? (
          <SignIg />
        ) : (
          <form onSubmit={handleLogin}>
            <input
              type="text"
              value={username}
              name="Username"
              placeholder="Nombre de usuario"
              onChange={({ target }) => setUsername(target.value)}
            />
            {errorLogin.username && (
              <p className="error-message">{errorLogin.username}</p>
            )}
            <input
              type="password"
              value={password}
              name="Password"
              placeholder="Contraseña"
              onChange={({ target }) => setPassword(target.value)}
            />
            {errorLogin.password && (
              <p className="error-message">{errorLogin.password}</p>
            )}
            {errorLogin && (
              <p className="error-message">{errorLogin}</p>
            )}{" "}
            <button className="button" disabled={isLoading}>Iniciar sesión</button>
          </form>
        )}
        <p>ó</p>
        <button className="button" onClick={() => setIsSignIn(!isSignIn)}>
          {isSignIn ? `Ya tengo usuario` : `Registrarme`}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
