import React from "react";

const Searchbar = ({ onChange }) => {
  return (
    <div className="Searchbar">
      <input
        type="text"
        placeholder="Search Pokemon by Name..."
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Searchbar;
