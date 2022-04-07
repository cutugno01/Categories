//*| Hooks and Libraries
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

//*| Components
import Overlay from "../Overlay";

const ForgotPasswordReset = () => {
  const navigate = useNavigate();
  const [showError, setShowError] = useState([""]);
  const [doesPasswordMatch, setDoesPasswordMatch] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  interface IState {
    token: string;
    password: string;
    confirmPassword: string;
  }

  const [state, setState] = useState<IState>({
    token: "",
    password: "",
    confirmPassword: "",
  });

  const handleSetStateValue = (name: string, value: string) => {
    setState((state) => ({
      ...state,
      [name]: value,
    }));
  };

  useEffect(() => {
    state.confirmPassword === state.password
      ? setDoesPasswordMatch(true)
      : setDoesPasswordMatch(false);
    state.password === "" && setDoesPasswordMatch(false);
  }, [state.confirmPassword, state.password]);

  const handlePasswordReset = (e: any) => {
    e.preventDefault();
    let errorMessage: Array<string> = [];
    state.password.length < 8 &&
      errorMessage.push("Password must have at least 8 characters");
    !doesPasswordMatch &&
      errorMessage.push("Password has to match with confirm password");

    if (errorMessage.length !== 0) {
      setShowError(errorMessage);
      return;
    }
    axios
      .get(
        `https://onlinegameshop-samdav.nexthub.io/api/user.php?a=2&ty=0&s=1&rc=${state.token}&password=${state.password}`
      )
      .then((response) => {
        console.log(response.data);
        const type = response.data.response.type;
        const code = response.data.response["1"];
        if (type === "ERROR") {
          switch (code) {
            case 406:
              errorMessage.push("Email already registered");
              break;
            case 415:
              errorMessage.push("Invalid email");
              break;
            case 416:
              errorMessage.push("Invalid password");
              break;
            default:
              errorMessage.push("An error occurred");
          }
          setShowError(errorMessage);
          navigate("/reset-password");
          return;
        }
        setIsModalOpen(true);
        return;
      });
  };

  return (
    <form
      className="auth forgot"
      onSubmit={(e) => {
        handlePasswordReset(e);
      }}
    >
      <h2 className="auth-title">Password reset</h2>
      {showError[0] !== "" && (
        <div className="auth-error-message-container">
          <h3 className="auth-error-message">{showError}</h3>
        </div>
      )}
      <div className="auth-input-wrapper">
        <input
          required
          type="token"
          placeholder="Token"
          onChange={(e) => handleSetStateValue("token", e.target.value)}
          className={`${state.token !== "" ? "active" : ""}`}
        />
        <div className="auth-input-container relative">
          <input
            required
            type={`${isPasswordVisible ? "text" : "password"}`}
            placeholder="Password"
            onChange={(e) => handleSetStateValue("password", e.target.value)}
            className={`${state.password !== "" ? "active" : ""}`}
          />
          <div
            className="auth-input-icon-container"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? (
              <svg
                className="auth-input-icon"
                fill="#0f3747"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="auth-input-icon"
                fill="#0f3747"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                  clipRule="evenodd"
                />
                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
              </svg>
            )}
          </div>
        </div>
        <div className="auth-input-container relative">
          <input
            required
            type="password"
            placeholder="Confirm password"
            onChange={(e) =>
              handleSetStateValue("confirmPassword", e.target.value)
            }
            className={`${state.confirmPassword !== "" ? "active" : ""}`}
          />
          <div className="auth-input-icon-container">
            {doesPasswordMatch ? (
              <svg
                className="auth-input-icon"
                fill="#00a896"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="auth-input-icon"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
      <button className="auth-button">Request reset</button>
      <div className={`auth-modal modal ${isModalOpen ? "active" : ""}`}>
        <div className="modal-message-container">
          <svg
            className="modal-icon"
            fill="#e6e7da"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          <h3 className="modal-message">
            Password reset! you can now{" "}
            <u
              className="auth-link"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </u>{" "}
            with your password
          </h3>
        </div>
      </div>
      <Overlay isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </form>
  );
};

export default ForgotPasswordReset;
