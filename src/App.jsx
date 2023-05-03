import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import "./App.css";
import Header from "./components/Header";
import Boards from "./components/Boards";

function App() {
  const [boards, setBoards] = useState(
    localStorage.getItem("data")
      ? JSON.parse(localStorage.getItem("data"))
      : [
          {
            id: 1,
            title: "Сделать",
            items: [
              { id: 1, title: "Пойти в магазин" },
              { id: 2, title: "Выкинуть мусор" },
              { id: 3, title: "Покушать" },
            ],
          },
          {
            id: 2,
            title: "Выполняется",
            items: [
              { id: 4, title: "Код ревью" },
              { id: 5, title: "Задача на факториал" },
              { id: 6, title: "Задачи на фибоначи" },
            ],
          },
          {
            id: 3,
            title: "Сделано",
            items: [
              { id: 7, title: "Снять видео" },
              { id: 8, title: "Смонтировать" },
              { id: 9, title: "Отрендерить" },
            ],
          },
        ]
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
    setBoards((prev) => [...prev].filter((board) => board.id !== id));

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
      copyBoard[indexBoard].items = copyBoard[indexBoard].items.filter(
        (item) => item.id !== id
      );

      return copyBoard;
    });
  }

  // ======================================

  function editItem(id, indexBoard, indexItem) {
    setBoards((prev) => {
      const copyBoard = [...prev];
      console.log(indexBoard)
      console.log(indexItem)

      

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
        editItem={editItem}
      />
    </div>
  );
}

export default App;
