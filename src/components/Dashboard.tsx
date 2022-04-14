//*| Hooks and Libraries
import { useNavigate } from "react-router";

const Dashboard = ({
  user,
  auth,
  handleLogout,
}: {
  user: {
    username: string;
    id: number;
  };
  auth: boolean;
  handleLogout?: any;
}) => {
  const navigate = useNavigate();
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">
        Welcome {auth ? user.username : "to Categories"}!
      </h1>
      {!auth && (
        <h2 className="dashboard-paragraph">
          Login or signup in order to create and join a game
        </h2>
      )}
      {auth ? (
        <>
          <button
            className="button button-light-2"
            onClick={() => navigate("/create")}
          >
            <h3>Create Game</h3>
          </button>
          <button className="button button-dark-1" onClick={handleLogout}>
            <svg
              className="button-icon"
              fill="#e6e7da"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <h3>Logout</h3>
          </button>
        </>
      ) : (
        <>
          <button
            className="button button-light-1"
            onClick={() => navigate("/login")}
          >
            <h3>Login</h3>
          </button>
          <button
            className="button button-light-2"
            onClick={() => navigate("/signup")}
          >
            <h3>Signup</h3>
          </button>
        </>
      )}
    </div>
  );
};

export default Dashboard;
