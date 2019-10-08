import React from "react"

function Customer({listing}){
  return (
    <select name='Customers' form='Customers'>
      {listing.map((item) => {
        return <option value={item}>{item}</option>
      })}
    </select>
  );
}

export default Customer