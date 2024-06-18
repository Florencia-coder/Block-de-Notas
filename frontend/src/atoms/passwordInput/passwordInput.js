import React, { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./passwordInput.css"

const PasswordInput = ({
  password,
  setPassword,
  placeholder = "Contraseña",
  error,
  name = "password",
}) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
<>

    <div className="block-password">
      <input
      className="block-password_input"
        type={showPassword ? "text" : "password"}
        value={password}
        name={name}
        required
        placeholder={placeholder}
        onChange={({ target }) => setPassword(target.value)}
        
      />
      <FontAwesomeIcon
        icon={showPassword ? faEye : faEyeSlash}
        onClick={() => setShowPassword(!showPassword)}
        className="eye-icon"
      />
    </div>
      {error && <p className="error-msg">{error}</p>}
</>
  );
};

export default PasswordInput;
