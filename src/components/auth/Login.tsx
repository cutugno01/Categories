//*| Hooks and Libraries
import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

//*| Styles
import "../../styles/auth.css";
import "../../styles/login.css";

//*| Components
import GooglePng from "../../assets/img/google-icon-png.png";

const Login = () => {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showError, setShowError] = useState([""]);

  interface IState {
    email: string;
    password: string;
  }

  const [state, setState] = useState<IState>({
    email: "",
    password: "",
  });

  const handleSetStateValue = (name: string, value: string) => {
    setState((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleLoginRequest = async (e: any) => {
    e.preventDefault();
    let errorMessage: Array<string> = [];
    axios
      .get(
        `https://onlinegameshop-samdav.nexthub.io/api/user.php?a=1&s=0&email=${state.email}&password=${state.password}`
      )
      .then((response) => {
        console.log(response);
        const responseType: string | null | undefined =
          response.data.response.type;
        const responseCode: number | null | undefined =
          response.data.response.code;
        if (responseType !== "SUCCESS") {
          switch (responseCode) {
            case 400:
              errorMessage.push("Invalid username or password");
              break;
            case 401:
              errorMessage.push("Invalid fields");
              break;
            default:
              errorMessage.push("An error occurred");
          }
          setShowError(errorMessage);
          return;
        }
        const token: string = response.data.data.auth_token;
        window.localStorage.setItem("jwt", token);
        navigate("/");
        window.location.reload();
      });
  };

  return (
    <form className="auth login" onSubmit={handleLoginRequest}>
      <h2 className="auth-title">Login</h2>
      <div className="auth-link-container">
        <h3>Don't have an account?</h3>
        <h3 className="auth-link" onClick={() => navigate("/signup")}>
          Signup
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
            className={`${state.email !== "" ? "active" : ""}`}
            onChange={(e) => {
              handleSetStateValue("email", e.target.value);
            }}
          />
        </div>
        <div className="auth-input-container relative">
          <input
            required
            type={`${isPasswordVisible ? "text" : "password"}`}
            placeholder="Password"
            className={`${state.password !== "" ? "active" : ""}`}
            onChange={(e) => {
              handleSetStateValue("password", e.target.value);
            }}
            //onClick={test}
          />
          <div
            className="auth-input-icon-container"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? (
              <svg
                className="auth-input-icon"
                fill="currentColor"
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
                fill="currentColor"
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
        {/* <div className="auth-addons">
          <div className="auth-remember-me">
            <input type="checkbox" />
            <p>Remember me</p>
          </div>
          <a className="login-forgot">Forgot password?</a>
        </div> */}
        <p
          className="login-forgot"
          onClick={() => navigate("/request-reset-password")}
        >
          Forgot password?
        </p>
      </div>
      <button className="auth-button">Login</button>
      <div className="login-alternative">
        <h3>Or login with:</h3>
        <div className="login-alternative-container">
          <img className="login-alternative-img" src={GooglePng} alt="a" />
        </div>
      </div>
    </form>
  );
};

export default Login;
