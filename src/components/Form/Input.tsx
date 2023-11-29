import React from "react";
const Input = ({ value,onChange,type,placeholder,className,style }:any) => {
    return (
        <input type={type} value={value} onChange={onChange} placeholder={placeholder} className={className} style={style}></input>
    );
}
export default Input;