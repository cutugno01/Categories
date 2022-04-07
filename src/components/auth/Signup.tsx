//*| Hooks and Libraries
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

//*| Styles
import "../../styles/auth.css";
import "../../styles/signup.css";

//*| Components
import Overlay from "../Overlay";

const Signup = () => {
  const navigate = useNavigate();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [doesPasswordMatch, setDoesPasswordMatch] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showError, setShowError] = useState([""]);

  interface IState {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  }

  const [state, setState] = useState<IState>({
    email: "",
    username: "",
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

  const handleSignupRequest = async (e: any) => {
    e.preventDefault();

    // Regex
    const uppercaseRegExp = /(?=.*?[A-Z])/;
    const lowercaseRegExp = /(?=.*?[a-z])/;
    const digitsRegExp = /(?=.*?[0-9])/;
    //const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    const minLengthRegExp = /.{8,}/;

    const uppercasePassword = uppercaseRegExp.test(state.password);
    const lowercasePassword = lowercaseRegExp.test(state.password);
    const digitsPassword = digitsRegExp.test(state.password);
    //const specialCharPassword = specialCharRegExp.test(state.password);
    const minLengthPassword = minLengthRegExp.test(state.password);

    let errorMessage: Array<string> = [];
    state.email.length === 0 && errorMessage.push("Email is required.");
    state.username.length < 5 &&
      errorMessage.push("Username must have at least 5 chrarcters.");
    !uppercasePassword &&
      errorMessage.push("Password must at least have an upper case letter");
    !lowercasePassword &&
      errorMessage.push("Password must at least have a lowercase case letter");
    !digitsPassword &&
      errorMessage.push("Password must at least have a number");
    !minLengthPassword &&
      errorMessage.push("Password must at least be 8 characters long");
    !doesPasswordMatch &&
      errorMessage.push("Password has to match with confirm password.");

    if (errorMessage.length !== 0) {
      setShowError(errorMessage);
      return;
    }
    axios
      .get(
        `https://onlinegameshop-samdav.nexthub.io/api/user.php?a=0&s=0&email=${state.email}&username=${state.username}&password=${state.password}`
      )
      .then((response) => {
        console.log(response.data);
        const type = response.data.response.type;
        const code = response.data.response["1"];
        console.log(code, type);
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
          return;
        }
        setIsModalOpen(true);
        return;
      });
  };

  return (
    <form className="auth signup" onSubmit={handleSignupRequest}>
      <h2 className="auth-title">Signup</h2>
      <div className="auth-link-container">
        <h3>Already have an account?</h3>
        <h3 className="auth-link" onClick={() => navigate("/login")}>
          Login
        </h3>
      </div>
      {showError[0] !== "" && (
        <div className="auth-error-message-container">
          {showError.map((error) => {
            return (
              <h3 key={showError.indexOf(error)} className="auth-error-message">
                <svg
                  className="auth-error-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {error}
              </h3>
            );
          })}
        </div>
      )}
      <div className="auth-input-wrapper">
        <div className="auth-input-container">
          <input
            required
            type="email"
            placeholder="Email"
            onChange={(e) => handleSetStateValue("email", e.target.value)}
            className={`${state.email !== "" ? "active" : ""}`}
          />
        </div>
        <div className="auth-input-container">
          <input
            required
            type="text"
            placeholder="Username"
            onChange={(e) => handleSetStateValue("username", e.target.value)}
            className={`${state.username !== "" ? "active" : ""}`}
          />
        </div>
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
      <button className="auth-button">Signup</button>
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
            Almost there! We've sent an email to {state.email}, please confirm
            your account
          </h3>
        </div>
      </div>
      <Overlay isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </form>
  );
};

export default Signup;
