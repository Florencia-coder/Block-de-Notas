import React, { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signUpSchema } from "./validationSchemas";
import { usePostUser } from "../../../../actions";
import "./signIn.css";

const SignIg = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorSignIn, setErrorSignIn] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { mutate } = usePostUser();

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      await signUpSchema.validate(
        { name, username, password, confirmPassword },
        { abortEarly: false }
      );
      mutate({
        name,
        username,
        password,
      });
    } catch (e) {
      if (e.name === "ValidationError") {
        const errors = {};
        e.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        setErrorSignIn(errors);
      } else {
        setErrorSignIn(
          e.response?.data?.error ||
            "Algo salío mal durante la creación de usuario."
        );
      }
    }
    setTimeout(() => {
      setErrorSignIn("");
    }, 3000);
  };
  return (
    <>
      <form onSubmit={handleSignIn}>
        <input
          type="text"
          value={name}
          name="FullName"
          placeholder="Nombre completo"
          onChange={({ target }) => setName(target.value)}
        />
        {errorSignIn.name && (
          <p className="error-message">{errorSignIn.name}</p>
        )}
        <input
          type="text"
          value={username}
          name="Username"
          placeholder="Nombre de usuario"
          onChange={({ target }) => setUsername(target.value)}
        />
        {errorSignIn.username && (
          <p className="error-message">{errorSignIn.username}</p>
        )}
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            name="Password"
            placeholder="Contraseña"
            onChange={({ target }) => setPassword(target.value)}
          />
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            onClick={() => setShowPassword(!showPassword)}
            className="eye-icon"
          />
        </div>
        {errorSignIn.password && (
          <p className="error-message">{errorSignIn.password}</p>
        )}
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            name="confirmPassword"
            placeholder="Confirma tu contraseña"
            onChange={({ target }) => setConfirmPassword(target.value)}
          />
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            onClick={() => setShowPassword(!showPassword)}
            className="eye-icon"
          />
        </div>
        {errorSignIn.confirmPassword && (
          <p className="error-message">{errorSignIn.confirmPassword}</p>
        )}
        {errorSignIn.general && (
          <p className="error-message">{errorSignIn.general}</p>
        )}{" "}
        <button className="button">¡ Registrarme !</button>
      </form>
    </>
  );
};

export default SignIg;
