import React from "react";
import "./button.css";

const Button =({onClick, title, type='', disabled=false})=>{
    return(
        <button className="button-mandy" onClick={onClick} type={type} disabled={disabled}>
            {title}
        </button>
        );
}

export default Button;
