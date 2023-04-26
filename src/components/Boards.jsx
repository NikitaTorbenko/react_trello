import React, { useState } from "react";

const Boards = ({ boards, setBoards, removeItem, removeBoard, isMenyatble }) => {
  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  function dragOverHandler(e) {
    e.preventDefault();
    if (e.target.className === "item") {
      e.target.style.boxShadow = "0 2px 3px gray";
    }
  }

  function dragLeaveHandler(e) {
    e.target.style.boxShadow = "none";
  }

  function dragStartHandler(e, board, item) {
    setCurrentBoard(board);
    setCurrentItem(item);
  }

  function dragEndHandler(e) {
    e.target.style.boxShadow = "none";
  }

  function dropHandler(e, board, item) {
    e.preventDefault();
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    const dropIndex = board.items.indexOf(item);
    board.items.splice(dropIndex + 1, 0, currentItem);
    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      })
    );
  }

  function dropCardHandler(e, board) {
    board.items.push(currentItem);
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      })
    );
  }

  // my drag

  const [currentCard, setCurrentCard] = useState(null);

  function dragStartHandlerCard(e, card) {
    setCurrentCard(card);
  }

  function dragLeaveHandlerCard(e) {
    e.target.style.background = "none";
  }

  function dragEndHandlerCard(e) {
    e.target.style.background = "none";
  }

  function dragOverHandlerCard(e) {
    e.preventDefault();
    e.target.style.background = "lightgray";
  }

  function dropCardHandlerCard(e, card) {
    e.preventDefault();
    setBoards((prev) =>
      [...prev].map((c) => {
        if (c.id === card.id) {
          return { ...c, order: currentCard.order };
        }
        if (c.id === currentCard.id) {
          return { ...c, order: card.order };
        }
        return c;
      })
    );
    e.target.style.background = "none";
  }

  const sortCards = (a, b) => {
    if (!isMenyatble){
      if (a.order > b.order) {
        return 1;
      } else {
        return -1;
      }
    }
  };

  return (
    <div className="app">
      {boards.sort(sortCards).map((board) => (
        <div
          onDragStart={(e) => dragStartHandlerCard(e, board)}
          onDragLeave={(e) => dragLeaveHandlerCard(e)}
          onDragEnd={(e) => dragEndHandlerCard(e)}
          onDragOver={(e) => dragOverHandlerCard(e)}
          onDrop={(e) => dropCardHandlerCard(e, board)}
          draggable={!isMenyatble}
          className="board"
        >
          <div className="board__title">{board.title}</div>
          {board.title === "Сделано"
            ? board.items.map((item) => (
                <div
                  onDragOver={(e) => dragOverHandler(e)}
                  onDragLeave={(e) => dragLeaveHandler(e)}
                  onDragStart={(e) => dragStartHandler(e, board, item)}
                  onDragEnd={(e) => dragEndHandler(e)}
                  onDrop={(e) => dropHandler(e, board, item)}
                  draggable={isMenyatble}
                  className="item"
                >
                  {item.title}{" "}
                  <button onClick={() => removeItem(item.id)}>Удалить</button>
                </div>
              ))
            : board.items.map((item) => (
                <div
                  onDragOver={(e) => dragOverHandler(e)}
                  onDragLeave={(e) => dragLeaveHandler(e)}
                  onDragStart={(e) => dragStartHandler(e, board, item)}
                  onDragEnd={(e) => dragEndHandler(e)}
                  onDrop={(e) => dropHandler(e, board, item)}
                  draggable={true}
                  className="item"
                >
                  {item.title}
                </div>
              ))}
          <button onClick={() => removeBoard(board.id)}>Удалить доску</button>
        </div>
      ))}
    </div>
  );
};

export default Boards;
