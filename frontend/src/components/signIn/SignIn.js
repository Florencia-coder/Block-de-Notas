import React from "react";
import "./signIn.css";
import Input from "../../atoms/input/input.js";
import Button from "../../atoms/button/Button.js";
import PasswordInput from "../../atoms/passwordInput/passwordInput.js";
import useHookSignIn from "./utils/useHookSignIn";

const SignIg = () => {
    const {
      name,
      setName,
      username,
      setUsername,
      password,
      setPassword,
      confirmPassword,
      setConfirmPassword,
      errorSignIn,
      showPassword,
      setShowPassword,
      handleSignIn,
      isLoading,
    } = useHookSignIn();

  return (
    <>
      <form className="sign-in_form" onSubmit={handleSignIn}>
        <Input value={name} setValue={setName} error={errorSignIn.name ?? null} placeholder="Nombre completo" name="FullName" autoComplete='name' />
        <Input value={username} setValue={setUsername} error={errorSignIn.username ?? null} placeholder="Nombre de usuario" name="UserName" autoComplete='email' />

        <PasswordInput
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          placeholder="Contraseña"
          error={errorSignIn.password}
        />
        <PasswordInput
          password={confirmPassword}
          setPassword={setConfirmPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          placeholder="Confirma tu contraseña"
          error={errorSignIn.confirmPassword}
          name="confirmPassword"
        />
        {errorSignIn.general && (
          <p className="error-message">{errorSignIn.general}</p>
        )}{" "}
        <Button 
        disabled={isLoading}
        title='¡ Registrarme !'
        />
      </form>
    </>
  );
};

export default SignIg;
