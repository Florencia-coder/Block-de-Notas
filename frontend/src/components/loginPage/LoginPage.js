import React, { useEffect, useState } from "react";
import { postLogin } from "../../actions";
import { useNavigate } from "react-router-dom";
import "./loginPage.css";
import * as Yup from "yup";
import SignIg from "./subComponents/signIn/SignIn";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");
  const [isSignIn, setIsSignIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Nombre de usuario requerido"),
    password: Yup.string().required("Contraseña requerida"),
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await validationSchema.validate(
        { username, password },
        { abortEarly: false }
      );
      const user = await postLogin({
        username,
        password,
      });
      setUser(user);
      window.localStorage.setItem("loginUser", JSON.stringify(user));
      navigate("/home");
    } catch (e) {
      if (e.name === "ValidationError") {
        const errors = {};
        e.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        setErrorLogin(errors);
      } else {
        setErrorLogin(
          e.response?.data?.error || "Usuario o contraseña inválidos."
        );
      }

      setTimeout(() => {
        setErrorLogin("");
      }, 3000);
    }
  };

  useEffect(() => {
    const storageLogin = window.localStorage.getItem("loginUser");
    const { loginUser } = JSON.parse(storageLogin ?? "{}");
    if (loginUser) {
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            {errorLogin.general && (
              <p className="error-message">{errorLogin.general}</p>
            )}{" "}
            <button className="button">Iniciar sesión</button>
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
