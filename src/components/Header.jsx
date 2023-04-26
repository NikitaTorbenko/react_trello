import React, { useState } from "react";

const Header = ({ addTask, addBoard, isMenyatble, setIsMenyatble }) => {
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
      <div onClick={() => setIsMenyatble(prev => !prev)} className="headerBlock h">
        {isMenyatble ? (
          <>
            <h1 className="headerTitle">Менять задачи</h1>
            <h2 className="headerTitle">/</h2>
            <h3 className="headerTitle">Менять карточки</h3>
          </>
        ) : (
          <>
            <h1 className="headerTitle">Менять карточки</h1>
            <h2 className="headerTitle">/</h2>
            <h3 className="headerTitle">Менять задачи</h3>
          </>
        )}
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
