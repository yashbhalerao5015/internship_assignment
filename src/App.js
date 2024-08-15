import { useState } from "react";

export default function App() {
  const [number, setNumber] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [undo, setUndo] = useState([]);
  const [redo, setRedo] = useState([]);
  const maxValue = 150;
  const minValue = 0;

  function handleSubtract() {
    if (number > minValue) handleUpdateNumber(number - 1);
    else return;
  }

  function handleAddition() {
    if (number < maxValue) handleUpdateNumber(number + 1);
    else return;
  }
  function handleUpdateNumber(num) {
    setUndo([...undo, number]);
    setRedo([]);
    setNumber(num);
  }
  function handleSetNumber() {
    if (inputValue > maxValue || inputValue < minValue) return;
    else {
      handleUpdateNumber(Number(inputValue));
    }
  }

  function handleUndo() {
    if (undo.length === 0) return;
    const oldNum = undo.pop();
    setRedo([...redo, number]);
    setNumber(oldNum);
    setUndo(undo);
  }

  function handleRedo() {
    if (redo.length === 0) return;
    const newNum = redo.pop();
    setUndo([...undo, number]);
    setNumber(newNum);
    setRedo(redo);
  }

  return (
    <div className="main">
      <Accept
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSetNumber={handleSetNumber}
      />
      <Operations
        handleAddition={handleAddition}
        handleSubtract={handleSubtract}
        number={number}
      />
      <ProgressBar number={number} maxValue={maxValue} />
      <UndoRedo handleUndo={handleUndo} handleRedo={handleRedo} />
    </div>
  );
}

function Accept({ inputValue, setInputValue, handleSetNumber }) {
  return (
    <div>
      <label>Enter A Number: </label>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(Number(e.target.value))}
      ></input>{" "}
      <button onClick={handleSetNumber}>Submit</button>
    </div>
  );
}

function Operations({ handleAddition, handleSubtract, number }) {
  return (
    <div>
      <button onClick={handleSubtract}>- </button>
      <span> {number} </span>
      <button onClick={handleAddition}> +</button>
    </div>
  );
}

function ProgressBar({ number, maxValue }) {
  return <progress value={number} max={maxValue}></progress>;
}

function UndoRedo({ handleUndo, handleRedo }) {
  return (
    <div>
      <button onClick={handleUndo}>Undo</button>
      <button onClick={handleRedo}>Redo</button>
    </div>
  );
}
