import React, { useState } from "react";
import AddingBlock from "./AddingBlock";

const Header = ({ addTask, addBoard }) => {
  const [valueItemInput, setValueItemInput] = useState("");
  const [valueBoardInput, setValueBoardInput] = useState("");

  const handleChangeItem = (e) => setValueItemInput(e.target.value);

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
      <AddingBlock
        title={'Добавить задачу'}
        placeholderContent={'Текст задачи...'}
        valueInput={valueItemInput}
        handleChange={handleAddTask}
        handleAdd={handleChangeItem}
      />
      <AddingBlock
        title={'Добавить доску'}
        placeholderContent={'Название доски...'}
        valueInput={valueBoardInput}
        handleChange={handleChangeBoard}
        handleAdd={handleAddBoard}
      />
    </div>
  );
};

export default Header;
