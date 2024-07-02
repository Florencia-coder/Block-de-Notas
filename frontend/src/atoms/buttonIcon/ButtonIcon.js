import React from "react";
import "./buttonIcon.css";

const ButtonIcon =({onClick, title, type='', disabled=false})=>{
    return(
        <button className="button-icon" onClick={onClick} type={type} disabled={disabled}>
            {title}
        </button>
        );
}

export default ButtonIcon;