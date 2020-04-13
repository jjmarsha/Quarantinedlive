import React from "react";

/*

*/

const CustomDropdown = ({ list, onChange, placeholder, value, invalid }) => {
  return (
    <select
      className="w-100 rounded text-muted pl-2"
      defaultValue={placeholder}
      style={{
        height: "calc(1.5em + .75rem + 2px)",
        border: "1px solid",
        borderColor: invalid ? "#dc3545" : "#ced4da",
      }}
      value={value}
      onChange={onChange}
    >
      <option disabled hidden>
        {placeholder}
      </option>
      {list.map((item, key) => {
        return (
          <option value={item} key={key}>
            {item}
          </option>
        );
      })}
    </select>
  );
};

export default CustomDropdown;
