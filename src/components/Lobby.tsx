//*| Hooks and Libraries
import { useState } from "react";

//*| Components
import Overlay from "./Overlay";

//TODO if players < 2 do not start the game

const Lobby = () => {
  //TODO remove this variable (using it just for testing)
  const isLeader: boolean = true;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  interface ILobbyState {
    link: string;
    maxPlayers: number;
    players: { id: number; name: string; leader: boolean }[];
  }

  const [lobbyState, setLobbyState] = useState<ILobbyState>({
    link: "https://www.link.com/1312305854",
    maxPlayers: 3,
    players: [
      { id: 0, name: "andre01", leader: true },
      { id: 1, name: "player2", leader: false },
      // { id: 2, name: "raffadawdawdheh", leader: false },
      // { id: 3, name: "rafdawddadwdadawdwadwafaheh", leader: false },
      // { id: 4, name: "raffaheh", leader: false },
      // { id: 5, name: "raffaheh", leader: false },
      // { id: 6, name: "raffaheh", leader: false },
    ],
  });

  const [isCopied, setIsCopied] = useState(false);
  const handleCopyLink = () => {
    navigator.clipboard.writeText(lobbyState.link);
    setIsCopied(true);
    setTimeout(function () {
      setIsCopied(false);
    }, 2000);
  };
  return (
    <>
      <div className="lobby">
        <h1 className="title-light-1 lobby-title">
          Done!
          <br />
          <small>Invite your friends with the link below</small>
        </h1>
        <div className="lobby-link-container" onClick={handleCopyLink}>
          <svg
            className="lobby-link-icon"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
            <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
          </svg>
          <h2 className={`lobby-link ${isCopied ? "copied" : ""}`}>
            {lobbyState.link}
          </h2>
        </div>
        <h3 className="paragraph-light-1">
          {isLeader
            ? "Click play when you're ready"
            : "Wait for the leader to start"}
        </h3>
        <div className="lobby-players">
          <h2 className="lobby-players-title">Players</h2>
          <div className="lobby-player-list">
            {lobbyState.players.map((player) => {
              return (
                <div
                  className={`lobby-player ${player.leader ? "leader" : ""}`}
                  key={player.id}
                >
                  <h3 className="lobby-player-id">{player.id}</h3>
                  <h2 className="lobby-player-name">{player.name}</h2>
                </div>
              );
            })}
          </div>
          <p className="lobby-player-count">2/3</p>
        </div>
        {isLeader && (
          <div className="flex-center">
            <button
              className="button button-dark-1"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              <svg
                className="button-icon"
                fill="#eff0e7"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button className="button button-light-2">
              <h3>Play&nbsp;</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                className="button-icon"
                fill="#02c39a"
              >
                <path d="M448 64H192C85.96 64 0 149.1 0 256s85.96 192 192 192h256c106 0 192-85.96 192-192S554 64 448 64zM247.1 280h-32v32c0 13.2-10.78 24-23.98 24c-13.2 0-24.02-10.8-24.02-24v-32L136 279.1C122.8 279.1 111.1 269.2 111.1 256c0-13.2 10.85-24.01 24.05-24.01L167.1 232v-32c0-13.2 10.82-24 24.02-24c13.2 0 23.98 10.8 23.98 24v32h32c13.2 0 24.02 10.8 24.02 24C271.1 269.2 261.2 280 247.1 280zM431.1 344c-22.12 0-39.1-17.87-39.1-39.1s17.87-40 39.1-40s39.1 17.88 39.1 40S454.1 344 431.1 344zM495.1 248c-22.12 0-39.1-17.87-39.1-39.1s17.87-40 39.1-40c22.12 0 39.1 17.88 39.1 40S518.1 248 495.1 248z" />
              </svg>
            </button>
          </div>
        )}
      </div>
      <div className={`auth-modal modal ${isModalOpen ? "active" : ""}`}>
        <div className="modal-message-container">
          <svg
            className="modal-icon"
            fill="#eff0e7"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <h3 className="modal-message">
            Are you sure you want do delete the lobby?
          </h3>
          <div className="modal-button">
            <button className="button button-dark-1">
              <h3>Delete</h3>
            </button>
          </div>
        </div>
      </div>
      <Overlay isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default Lobby;
