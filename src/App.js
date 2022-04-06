import "./App.css";
import "./components/Darkmode/darkmode.css";
import React, { useState } from "react";
import Keyboard from "./components/Keyboard/Keyboard";
import { wordList } from "./data/wordBank";

const App = () => {
  function getSolution() {
    var alphabetIndex = Math.floor(Math.random() * 26);
    var wordIndex = Math.floor(
      Math.random() * wordList[String.fromCharCode(97 + alphabetIndex)].length
    );
    return wordList[String.fromCharCode(97 + alphabetIndex)][wordIndex];
  }
  let newBoardData = {
    solution: "",
    rowIndex: 0, //row index in which user will the data
    boardWords: [], //list of words user has entered
    boardRowStatus: [], //holds 6 array for each word wichh holds present,absent and correct for each letter in the word
    presentCharArray: [], // hold the letter which are present in the solution
    absentCharArray: [], // holds the letter which are not present in the array
    correctCharArray: [], //holds the letter which are at correct position in solution      these 4 keys are used for coloring the box and keyboard
    status: "IN_PROGRESS", // WON, LOST or in progress
  };

  const [boardData, setBoardData] = useState({
    ...newBoardData,
    solution: getSolution(),
  }); //contine Game from where the user leaves
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const [charArray, setCharArray] = useState([]); // Hold the Input

  const resetBoard = () => {
    var alphabetIndex = Math.floor(Math.random() * 26);
    var wordIndex = Math.floor(
      Math.random() * wordList[String.fromCharCode(97 + alphabetIndex)].length
    );
    newBoardData = {
      ...boardData,
      solution: wordList[String.fromCharCode(97 + alphabetIndex)][wordIndex],
      rowIndex: 0,
      boardWords: [],
      boardRowStatus: [],
      presentCharArray: [],
      absentCharArray: [],
      correctCharArray: [],
      status: "IN_PROGRESS",
    };
    setBoardData(newBoardData);
  };

  const handleMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const handleError = () => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 3000);
  };

  const enterBoardWord = (word) => {
    let boardWords = boardData.boardWords;
    let boardRowStatus = boardData.boardRowStatus;
    let solution = boardData.solution;
    let presentCharArray = boardData.presentCharArray;
    let absentCharArray = boardData.absentCharArray;
    let correctCharArray = boardData.correctCharArray;
    let rowIndex = boardData.rowIndex;
    let rowStatus = [];
    let matchCount = 0;
    let status = boardData.status;

    for (var index = 0; index < word.length; index++) {
      //populate the variables
      if (solution.charAt(index) === word.charAt(index)) {
        matchCount++;
        rowStatus.push("correct");
        if (!correctCharArray.includes(word.charAt(index)))
          correctCharArray.push(word.charAt(index));
        if (presentCharArray.indexOf(word.charAt(index)) !== -1)
          presentCharArray.splice(
            presentCharArray.indexOf(word.charAt(index)),
            1
          );
      } else if (solution.includes(word.charAt(index))) {
        rowStatus.push("present");
        if (
          !correctCharArray.includes(word.charAt(index)) &&
          !presentCharArray.includes(word.charAt(index))
        )
          presentCharArray.push(word.charAt(index));
      } else {
        rowStatus.push("absent");
        if (!absentCharArray.includes(word.charAt(index)))
          absentCharArray.push(word.charAt(index));
      }
    }

    if (matchCount === 5) {
      status = "WIN";
      handleMessage("¡Felicitaciones, adivinaste la palabra!");
    } else if (rowIndex + 1 === 6) {
      status = "LOST";
      handleMessage(boardData.solution.toUpperCase());
    }

    boardRowStatus.push(rowStatus);
    boardWords[rowIndex] = word;
    newBoardData = {
      ...boardData,
      boardWords: boardWords,
      boardRowStatus: boardRowStatus,
      rowIndex: rowIndex + 1,
      status: status,
      presentCharArray: presentCharArray,
      absentCharArray: absentCharArray,
      correctCharArray: correctCharArray,
    };
    setBoardData(newBoardData);
  };

  const enterCurrentText = (word) => {
    let boardWords = boardData.boardWords;
    let rowIndex = boardData.rowIndex;
    boardWords[rowIndex] = word;
    newBoardData = {
      ...boardData,
      boardWords: boardWords,
    };
    setBoardData(newBoardData);
  };

  const handleKeyPress = (key) => {
    //receive the key from keyboard component
    if (boardData.rowIndex > 5 || boardData.status === "WIN") return; //if user won ignore the input
    if (key === "ENVIAR") {
      if (charArray.length === 5) {
        let word = charArray.join("").toLowerCase();
        if (!wordList[word.charAt(0)].includes(word)) {
          handleError();
          handleMessage("¡No se encuentra en la lista!");
          return;
        }
        enterBoardWord(word);
        setCharArray([]);
      } else {
        handleMessage("¡No tiene suficientes letras!");
      }
      return;
    }
    if (key === "\u27f5") {
      //delete from kb
      charArray.splice(charArray.length - 1, 1);
      setCharArray([...charArray]);
    } else if (charArray.length < 5) {
      charArray.push(key);
      setCharArray([...charArray]);
    }
    enterCurrentText(charArray.join("").toLowerCase()); //push the new word to boardwords
  };

  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <div className="containerApp">
        <div className="containerTop">
          <div className="containerDM">
            <span
              className="iconDM"
              style={{ color: darkMode ? "grey" : "yellow" }}
            >
              ☀︎
            </span>
            <div className="switch-checkbox">
              <label className="switch">
                <input
                  type="checkbox"
                  onChange={() => setDarkMode(!darkMode)}
                />
                <span className="slider round"> </span>
              </label>
            </div>
            <span
              className="iconDM"
              style={{ color: darkMode ? "#b96df7" : "grey" }}
            >
              ☽
            </span>
          </div>
          <div className="containerTitle">
            <h1 className="title">WORDLESITO</h1>
            {boardData.status !== "IN_PROGRESS" && (
              <button className="reset-board" onClick={resetBoard}>
                {"\u27f3"}
              </button>
            )}
          </div>
        </div>

        {message && <div className="message">{message}</div>}

        <div className="containerCube">
          {[0, 1, 2, 3, 4, 5].map((row, rowIndex) => (
            <div
              className={`cube-row ${
                boardData && row === boardData.rowIndex && error && "error"
              }`}
              key={rowIndex}
            >
              {/*wigly effecy*/}
              {[0, 1, 2, 3, 4].map((column, letterIndex) => (
                <div
                  key={letterIndex}
                  className={`letter ${
                    boardData && boardData.boardRowStatus[row]
                      ? boardData.boardRowStatus[row][column]
                      : ""
                  }`}
                >
                  {boardData &&
                    boardData.boardWords[row] &&
                    boardData.boardWords[row][column]}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="containerKeyboard">
          <Keyboard boardData={boardData} handleKeyPress={handleKeyPress} />
        </div>
      </div>
    </div>
  );
};

export default App;
