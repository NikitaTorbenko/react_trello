import React from "react";

const AddingBlock = ({
  title,
  placeholderContent,
  valueInput,
  handleChange,
  handleAdd,
}) => {
  return (
    <div className="headerBlock">
      <h1 className="headerTitle">{title}</h1>
      <input
        value={valueInput}
        onChange={handleChange}
        className="headerInput"
        type="text"
        placeholder={placeholderContent}
      />
      <button onClick={handleAdd}>Добавить</button>
    </div>
  );
};

export default AddingBlock;
