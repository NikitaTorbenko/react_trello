import React, { useState, useRef } from "react";
import Task from "./Task";

const Boards = ({ boards, setBoards, removeItem, removeBoard, editItem }) => {
  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  function dragOverHandler(e) {
    e.preventDefault();
    // if (e.target.className === "item") {
    //   e.target.style.boxShadow = "0 2px 3px gray";
    // }
  }

  function dragLeaveHandler(e) {
    // e.target.style.boxShadow = "none";
  }

  function dragEndHandler(e) {
    // e.target.style.boxShadow = "none";
  }

  function dragStartHandler(e, board, item) {
    setCurrentBoard(board);
    setCurrentItem(item);
  }

  function dropHandler(e, board, item) {
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

  //================================================

  const [isItem, setIsItem] = useState(false);

  const [isBoard, setIsBoard] = useState(true);

  const mouseEnter = (e, board, item) => {
    if (board && !item) {
      setIsBoard(true);
    } else {
      setIsBoard(false);
    }

    if (item) {
      setIsItem(true);
    }
  };

  const mouseLeave = (e) => {
    setIsBoard(true);
    setIsItem(false);
  };

  const dragEnter = (e, index) => setIsItem(false);

  const dragEnterItem = (e) => setTimeout(() => setIsItem(true), 0);

  const currentBoardRef = useRef(null);
  const hoverBoardRef = useRef(null);

  const dragStartHandlerCard = (e, board, indexBoard) => {
    if (!isItem) {
      currentBoardRef.current = {
        indexBoard,
        board,
      };
    }
  };

  const dropHandlerCard = (e, board, indexBoard) => {
    e.preventDefault();
    hoverBoardRef.current = {
      indexBoard,
      board,
    };

    setBoards((prev) => {
      const copyBoard = [...prev];
      copyBoard[currentBoardRef.current.indexBoard] = copyBoard.splice(
        hoverBoardRef.current.indexBoard,
        1,
        currentBoardRef.current.board
      )[0];

      return copyBoard;
    });
  };

  return (
    <div className="app">
      {boards.map((board, index) => {
        return (
          <div
            onDragStart={(e) => dragStartHandlerCard(e, board, index)}
            draggable={true}
            onDragEnter={(e) => dragEnter(e, index)}
            onDrop={(e) => {
              if (!isItem) {
                if (isBoard) {
                  dropHandlerCard(e, board, index);
                } else {
                  dropCardHandler(e, board);
                }
              }
            }}
            onDragOver={(e) => dragOverHandler(e)}
            onMouseEnter={(e) => mouseEnter(e, board)}
            className="board"
            key={board.id}
          >
            <div className="board__title">{board.title}</div>
            {board.items.map((item, indexItem) => (
              <Task
                onDragOver={(e) => dragOverHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDragEnter={(e) => dragEnterItem(e, board, item)}
                onDragStart={(e) => dragStartHandler(e, board, item)}
                onDrop={(e) => {
                  if (isItem) {
                    dropHandler(e, board, item);
                  }
                }}
                draggable={true}
                className="item"
                key={item.id}
                onMouseEnter={(e) => mouseEnter(e, board, item)}
                onMouseLeave={(e) => mouseLeave(e, board, item)}
                onRemove={() => removeItem(item.id, index)}
                onEdit={() => editItem(item.id, index, indexItem)}
              >
                {item.title}
              </Task>
            ))}
            <button onClick={() => removeBoard(board.id)}>Удалить доску</button>
          </div>
        );
      })}
    </div>
  );
};

export default Boards;
