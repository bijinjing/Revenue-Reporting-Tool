import React from "react"

function SelectForm({name,listing,value, handler}){
  return (
    <select name={name} form={name} value={value} onChange={handler}>
      {listing.map((item) => {
        return <option value={item}>{item}</option>
      })}
    </select>
  );
}

export default SelectForm