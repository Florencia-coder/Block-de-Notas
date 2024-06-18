import React, { useState } from "react";
import SignIn from "../../components/signIn/SignIn.js";
import Login from "../../components/login/Login.js";
import Button from "../../atoms/button/Button.js";
import "./sesionPage.css";

const SesionPage = () => {

const [isSignIn, setIsSignIn] = useState(false);

  return (
    <div className="login">
      <div className="block-left">
        <h1 className="block-left_title">Mis Notas</h1>
      </div>
      <div className="block-right">
        <h1 className="block-right_title">¡Bienvenido!</h1>
        {isSignIn ? (
          <SignIn />
        ) : (
          <Login />
        )}
        <p className="block-right_text">ó</p>
        <Button
        onClick={() => setIsSignIn(!isSignIn)}
        title={isSignIn ? `Ya tengo usuario` : `Registrarme`}
        />
      </div>
    </div>
  );
};

export default SesionPage;
