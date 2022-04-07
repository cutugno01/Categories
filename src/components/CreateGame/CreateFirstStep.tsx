//*| Hooks and Libraries
import { useState } from "react";
import { useNavigate } from "react-router";

const CreateFirstStep = ({
  numberOfPlayers,
  numberOfRounds,
  timerList,
  state,
  nextStep,
  handleSetStateValue,
  handleNavigateToLobby,
}: {
  numberOfPlayers: Array<number>;
  numberOfRounds: Array<number>;
  timerList: Array<number>;
  state: any;
  nextStep: () => void;
  handleSetStateValue: (name: string, value: any) => void;
  handleNavigateToLobby: () => void;
}) => {
  const navigate = useNavigate();

  const [letterContainerKey, setLetterContainerKey] = useState(
    Math.floor(Math.random() * 300 + 1)
  );

  const handleToggleLetter = async (id: number) => {
    if (
      state.letters.filter(
        (letter: { id: number; letter: string; active: boolean }) =>
          letter.active === true
      ).length < 10 &&
      state.letters[id].active === true
    ) {
      return;
    }
    let newLetterList = state.letters;
    newLetterList[id].active = !newLetterList[id].active;
    handleSetStateValue("letters", newLetterList);
    setLetterContainerKey(Math.floor(Math.random() * 300 + 1));
  };

  return (
    <div className="create">
      <h1 className="title-light-1">Set up your game</h1>
      <div className="create-input-container">
        <h3 className="create-input-title-light">Players</h3>
        <select
          className="create-select"
          value={state.numberOfPlayers}
          onChange={(e) => {
            handleSetStateValue("numberOfPlayers", parseInt(e.target.value));
          }}
        >
          {numberOfPlayers.map((number: number) => {
            return (
              <option value={number} key={number}>
                {number}
              </option>
            );
          })}
        </select>
      </div>
      <div className="create-input-container">
        <h3 className="create-input-title-light">Rounds</h3>
        <select
          className="create-select"
          value={state.rounds}
          onChange={(e) => {
            handleSetStateValue("rounds", parseInt(e.target.value));
          }}
        >
          {numberOfRounds.map((number: number) => {
            return (
              <option value={number} key={number}>
                {number}
              </option>
            );
          })}
        </select>
      </div>
      <div className="create-input-container">
        <h3 className="create-input-title-light">Timer</h3>
        <select
          className="create-select"
          value={state.timer}
          onChange={(e) => {
            handleSetStateValue("timer", parseInt(e.target.value));
          }}
        >
          {timerList.map((timer: number) => {
            return (
              <option value={timer} key={timer}>
                {timer}s
              </option>
            );
          })}
        </select>
      </div>
      <button
        className={`button button-light-2 create-custom-categories-button ${
          state.isCustomCategoriesActive ? "active" : ""
        }`}
        onClick={() => {
          handleSetStateValue(
            "isCustomCategoriesActive",
            !state.isCustomCategoriesActive
          );
        }}
      >
        <h3>Custom Categories</h3>
      </button>
      <div className="create-letters">
        <h3 className="create-input-title-dark create-letters-title">
          Letters&nbsp;
          <u>(click to remove)</u>
        </h3>
        <div className="create-letters-container" key={letterContainerKey}>
          {state.letters.map(
            (letter: { id: number; letter: string; active: boolean }) => {
              return (
                <h4
                  className={`create-letter ${letter.active ? "active" : ""}`}
                  key={letter.id}
                  onClick={() => handleToggleLetter(letter.id)}
                >
                  {letter.letter}
                </h4>
              );
            }
          )}
        </div>
      </div>
      <div className="create-step-buttons">
        <button className="button button-dark-1" onClick={() => navigate("/")}>
          <svg
            className="button-icon"
            fill="#eff0e7"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <h3>Go back</h3>
        </button>
        {state.isCustomCategoriesActive ? (
          <button className="button button-light-1" onClick={nextStep}>
            <h3>Next</h3>
            <svg
              className="button-icon"
              fill="#0f3747"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        ) : (
          <button
            className="button button-light-2"
            onClick={handleNavigateToLobby}
          >
            <h3>Done</h3>
            <svg
              className="button-icon"
              fill="none"
              stroke="#02c39a"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateFirstStep;
