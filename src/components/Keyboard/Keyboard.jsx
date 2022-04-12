import React, { useEffect } from "react";
import { keys } from "../data/keys";
import "./Keyboard.css";


const Keyboard = ({ boardData, handleKeyPress }) => {
  function handleKeyboard(key) {
    //function for handling keydown eventlistner
    if (key.key === "Enter") handleKeyPress("ENVIAR");
    if (key.key === "Backspace") handleKeyPress("\u27f5");
    if (key.key.length === 1 && key.key.toLowerCase() !== key.key.toUpperCase())
      handleKeyPress(key.key.toUpperCase());
  }
  
  useEffect(() => {
    //Eventlistner for handling keyboard
    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyPress]);

  return (
    <div className="keyboard-rows">
      {keys.map((item, index) => (
        <div className="row" key={index}>
          {item.map((key, keyIndex) => (
            <button
              key={keyIndex}
              className={`${
                boardData && boardData.correctCharArray.includes(key)
                  ? "key-correct"
                  : boardData && boardData.presentCharArray.includes(key)
                  ? "key-present"
                  : boardData && boardData.absentCharArray.includes(key)
                  ? "key-absent"
                  : ""
              } `}
              onClick={() => {
                handleKeyPress(key);
              }}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
