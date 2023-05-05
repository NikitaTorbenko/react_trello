import React from "react";

const Task = ({ children, onRemove, ...props }) => {
  const [isEdit, setIsEdit] = React.useState(false);
  const [value, setValue] = React.useState(children);

  return (
    <div {...props}>
      {isEdit ? (
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        value
      )}
      {isEdit ? (
        <button className="itemBtn" onClick={() => setIsEdit(false)}>
          Сохранить
        </button>
      ) : (
        <button className="itemBtn" onClick={() => setIsEdit(true)}>
          Редактировать
        </button>
      )}
      <button className="itemBtn" onClick={onRemove}>
        Удалить
      </button>
    </div>
  );
};

export default Task;
