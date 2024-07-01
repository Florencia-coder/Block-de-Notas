import React, { useState } from "react";
import SignIn from "../../components/signIn/SignIn.js";
import Login from "../../components/login/Login.js";
import Button from "../../atoms/button/Button.js";
import "./sesionPage.css";

const SesionPage = () => {

const [isSignIn, setIsSignIn] = useState(false);

  return (
    <div className="container-login" >
    <div className="login-block">
        <h1 className="login-block-title">¡Bienvenido!</h1>
        {isSignIn ? (
          <SignIn />
        ) : (
          <Login />
        )}
        <Button
        onClick={() => setIsSignIn(!isSignIn)}
        title={isSignIn ? `Ya tengo usuario` : `Registrarme`}
        />
    </div>
    </div>
  );
};

export default SesionPage;
