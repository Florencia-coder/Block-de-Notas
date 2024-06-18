import React from "react";
import "./login.css";
import useHookLogin from "./utils/useHookLogin.js";
import Input from "../../atoms/input/input.js";
import PasswordInput from "../../atoms/passwordInput/passwordInput.js";
import Button from "../../atoms/button/Button.js";

const Login = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    errorLogin,
    handleLogin,
    isLoading,
} = useHookLogin();

  return (
        <>
          <form className="block-form" onSubmit={handleLogin}>
            <Input value={username} setValue={setUsername} name="UserName" placeholder="Nombre de usuario" error={errorLogin.username} autoComplete="email" />
            <PasswordInput password={password} setPassword={setPassword} error={errorLogin.password}/>

            {errorLogin.general && (
              <p className="block-form_error">{errorLogin.general}</p>
            )}{" "}
            <Button
            disabled={isLoading}
            title="Iniciar sesión"
            type='submit'
            />
          </form>
       </>
  );
};

export default Login;
