//*| Hooks and Libraries
import { useState } from "react";
import { Navigate, useNavigate } from "react-router";

//*| Components
import CreateFirstStep from "./CreateFirstStep";
import CreateSecondStep from "./CreateSecondStep";

//*| Styles
import "../../styles/create-game.css";

const CreateGame = () => {
  const navigate = useNavigate();

  const numberOfPlayers: Array<number> = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const numberOfRounds: Array<number> = [2, 3, 4, 5, 6, 7, 8, 9];
  const timerList: Array<number> = [30, 60, 90, 120, 180];

  interface IState {
    step: number;
    numberOfPlayers: number;
    rounds: number;
    timer: number;
    letters: { id: number; letter: string; active: boolean }[];
    isCustomCategoriesActive: boolean;
    customCategories: { id: number; category: string }[];
  }

  const [state, setState] = useState<IState>({
    step: 1,
    numberOfPlayers: 3,
    rounds: 2,
    timer: 30,
    letters: [
      { id: 0, letter: "A", active: true },
      { id: 1, letter: "B", active: true },
      { id: 2, letter: "C", active: true },
      { id: 3, letter: "D", active: true },
      { id: 4, letter: "E", active: true },
      { id: 5, letter: "F", active: true },
      { id: 6, letter: "G", active: true },
      { id: 7, letter: "H", active: true },
      { id: 8, letter: "I", active: true },
      { id: 9, letter: "J", active: true },
      { id: 10, letter: "K", active: true },
      { id: 11, letter: "L", active: true },
      { id: 12, letter: "M", active: true },
      { id: 13, letter: "N", active: true },
      { id: 14, letter: "O", active: true },
      { id: 15, letter: "P", active: true },
      { id: 16, letter: "Q", active: true },
      { id: 17, letter: "R", active: true },
      { id: 18, letter: "S", active: true },
      { id: 19, letter: "T", active: true },
      { id: 20, letter: "U", active: true },
      { id: 21, letter: "V", active: true },
      { id: 22, letter: "W", active: true },
      { id: 23, letter: "X", active: true },
      { id: 24, letter: "Y", active: true },
      { id: 25, letter: "Z", active: true },
    ],
    isCustomCategoriesActive: false,
    customCategories: [
      { id: 0, category: "" },
      { id: 1, category: "" },
    ],
  });

  const nextStep = () => {
    setState((state) => ({
      ...state,
      step: state.step + 1,
    }));
  };

  const prevStep = () => {
    setState((state) => ({
      ...state,
      step: state.step - 1,
    }));
  };

  const handleSetStateValue = async (name: string, value: any) => {
    setState((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleDefaultStep = async () => {
    setState((state) => ({
      ...state,
      step: 1,
    }));
  };

  const handleCreateRequest = () => {
    //TODO: put request here
    navigate("/lobby");
  };

  const handleNavigateToLobby = () => {
    //console.log(state);
    if (!state.isCustomCategoriesActive) {
      handleCreateRequest();
      return;
    }
    if (!state.customCategories.some((e: any) => e.category === "")) {
      handleCreateRequest();
      return;
    }
  };

  return (
    <>
      {(() => {
        switch (state.step) {
          case 1:
            return (
              <CreateFirstStep
                numberOfPlayers={numberOfPlayers}
                numberOfRounds={numberOfRounds}
                timerList={timerList}
                state={state}
                nextStep={nextStep}
                handleSetStateValue={handleSetStateValue}
                handleNavigateToLobby={handleNavigateToLobby}
              />
            );
          case 2:
            if (state.isCustomCategoriesActive) {
              return (
                <CreateSecondStep
                  prevStep={prevStep}
                  state={state}
                  handleSetStateValue={handleSetStateValue}
                  handleNavigateToLobby={handleNavigateToLobby}
                />
              );
            } else {
              return <Navigate to="/" />;
            }
          default:
            handleDefaultStep();
        }
      })()}
    </>
  );
};

export default CreateGame;
