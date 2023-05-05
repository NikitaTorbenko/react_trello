import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import "./App.css";
import Header from "./components/Header";
import Boards from "./components/Boards";
import { DEFAULT_DATA } from "./constants";
import { removeElementById } from "./utils/boards";

function App() {
  const [boards, setBoards] = useState(
    localStorage.getItem("data")
      ? JSON.parse(localStorage.getItem("data"))
      : DEFAULT_DATA
  );

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(boards));
  }, [boards]);

  function addBoard(value) {
    if (value) {
      const newBoard = {
        id: v4(),
        title: value,
        items: [{ id: v4(), title: "Создана новая доска" }],
      };

      setBoards((prev) => [...prev, newBoard]);
    }
  }

  const removeBoard = (id) =>
    setBoards((prev) => removeElementById([...prev], id))


  function addItem(valueInput) {
    if (valueInput) {
      const newItem = {
        id: v4(),
        title: valueInput,
      };

      setBoards((prev) => {
        const copyBoard = [...prev];
        copyBoard[0] = {
          ...copyBoard[0],
          items: [...copyBoard[0].items, newItem],
        };

        return copyBoard;
      });
    }
  }

  function removeItem(id, indexBoard) {
    setBoards((prev) => {
      const copyBoard = [...prev];
      copyBoard[indexBoard].items = removeElementById(copyBoard[indexBoard].items, id)

      return copyBoard;
    });
  }

  return (
    <div className="wrap">
      <Header addTask={addItem} addBoard={addBoard} />
      <Boards
        boards={boards}
        setBoards={setBoards}
        removeBoard={removeBoard}
        removeItem={removeItem}
        addItem={addItem}
      />
    </div>
  );
}

export default App;
