import React from "react";
const Input = ({ value,onChange }:any) => {
    return (
        <input type="text" value={value} onChange={onChange}></input>
    );
}
export default Input;