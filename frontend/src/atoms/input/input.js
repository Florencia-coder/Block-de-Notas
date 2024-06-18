import React from "react";
import "./input.css"

const Input = ({value, setValue, error, placeholder, name, autoComplete=''})=>{
    return(
        <>
        <input
          id="input-text"
          type="text"
          value={value}
          name={name}
          placeholder={placeholder}
          required
          autoComplete={autoComplete}
          onChange={({ target }) => setValue(target.value)}
        />
        {error && (
            <p className="error-message">{error}</p>
          )}
        </>

    )

}

export default Input;