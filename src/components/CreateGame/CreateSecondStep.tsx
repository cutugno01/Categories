const CreateSecondStep = ({
  prevStep,
  state,
  handleSetStateValue,
  handleNavigateToLobby,
}: {
  prevStep: () => void;
  state: {
    step: number;
    numberOfPlayers: number;
    rounds: number;
    timer: number;
    letters: { id: number; letter: string; active: boolean }[];
    isCustomCategoriesActive: boolean;
    customCategories: { id: number; category: string }[];
  };
  handleSetStateValue: (name: string, value: {}[] | string | number) => void;
  handleNavigateToLobby: () => void;
}) => {
  const handleInputCustomCategory = async (id: number, value: string) => {
    let newCustomCategoryList: { id: number; category: string }[] =
      state.customCategories;
    newCustomCategoryList[id].category = value;
    handleSetStateValue("customCategories", newCustomCategoryList);
  };

  const handleNewCustomCategory = async () => {
    let newCustomCategoryList = state.customCategories;
    newCustomCategoryList.push({
      id: state.customCategories.length,
      category: "",
    });
    handleSetStateValue("customCategories", newCustomCategoryList);
  };

  const handleRemoveCustomCategory = async (id: number) => {
    let newCustomCategoryList = state.customCategories;
    newCustomCategoryList.splice(id, 1);
    handleSetStateValue("customCategories", newCustomCategoryList);
  };

  return (
    <div className="create">
      <h1 className="title-light-1">
        Almost done!
        <br />
        <i>Set up your custom categories</i>
      </h1>
      {state.customCategories.map(
        (category: { category: string; id: number }) => {
          return (
            <div className="relative" key={category.id}>
              <input
                type="text"
                spellCheck="false"
                className={`create-custom-category ${
                  category.category !== "" ? "active" : ""
                }`}
                value={category.category}
                placeholder="Write here"
                onChange={(e) => {
                  handleInputCustomCategory(category.id, e.target.value);
                }}
              />
              {category.id === state.customCategories.length - 1 &&
                category.id !== 0 && (
                  <svg
                    className="create-custom-category-delete"
                    fill="#eff0e7"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => {
                      handleRemoveCustomCategory(category.id);
                    }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
            </div>
          );
        }
      )}
      {state.customCategories.length < 8 && (
        <button
          className="button button-light-1"
          onClick={handleNewCustomCategory}
        >
          <svg
            className="button-icon create-add-icon"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
      <div className="create-step-buttons">
        <button className="button button-dark-1" onClick={prevStep}>
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
        <button
          className={`button button-light-2 ${
            state.customCategories.some(
              (category: { category: string; id: number }) =>
                category.category === ""
            )
              ? "button-inactive"
              : ""
          }`}
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
      </div>
    </div>
  );
};

export default CreateSecondStep;
