import React, { useState } from "react";

const Header = ({ addTask, addBoard }) => {
  const [valueItemInput, setValueItemInput] = useState("");
  const [valueBoardInput, setValueBoardInput] = useState("");

  const handleChange = (e) => setValueItemInput(e.target.value);

  const handleChangeBoard = (e) => setValueBoardInput(e.target.value);

  const handleAddTask = (e) => {
    addTask(valueItemInput);
    setValueItemInput("");
  };

  const handleAddBoard = (e) => {
    addBoard(valueBoardInput);
    setValueBoardInput("");
  };

  return (
    <div className="header">
      <div className="headerBlock">
        <h1 className="headerTitle">Добавить задачу</h1>
        <input
          value={valueItemInput}
          onChange={handleChange}
          className="headerInput"
          type="text"
          placeholder="Текст задачи..."
        />
        <button onClick={handleAddTask}>Добавить</button>
      </div>
      <div className="headerBlock">
        <h1 className="headerTitle">Добавить доску</h1>
        <input
          value={valueBoardInput}
          onChange={handleChangeBoard}
          className="headerInput"
          type="text"
          placeholder="Название доски..."
        />
        <button onClick={handleAddBoard}>Добавить</button>
      </div>
    </div>
  );
};

export default Header;
