//*| Hooks and Libraries
import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";

//*| Components
import Overlay from "../Overlay";

const ForgotPasswordRequest = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  interface IState {
    email: string;
  }

  const [state, setState] = useState<IState>({
    email: "",
  });

  const handleSetStateValue = (name: string, value: string) => {
    setState((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const [showError, setShowError] = useState("");

  const handlePasswordResetRequest = (e: any) => {
    e.preventDefault();
    let errorMessage = "";
    axios
      .get(
        `https://onlinegameshop-samdav.nexthub.io/api/user.php?a=2&ty=0&email=${state.email}`
      )
      .then((response) => {
        console.log(response.data);
        const type = response.data.response.type;
        const code = response.data.response["1"];
        if (type === "ERROR") {
          switch (code) {
            case 406:
              errorMessage = "Email already registered";
              break;
            case 415:
              errorMessage = "Invalid email";
              break;
            case 416:
              errorMessage = "Invalid password";
              break;
            default:
              errorMessage = "An error occurred";
          }
          setShowError(errorMessage);
          navigate("/reset-password");
          return;
        }
        navigate("/reset-password");
        //setIsModalOpen(true);
        return;
      });
  };

  return (
    <>
      <form
        className="auth forgot"
        onSubmit={(e) => {
          handlePasswordResetRequest(e);
        }}
      >
        <h2 className="auth-title">
          Password reset
          <br /> request
        </h2>
        <div className="auth-link-container">
          <h3 className="auth-link" onClick={() => navigate("/login")}>
            &lt; Go back
          </h3>
        </div>
        {showError !== "" && (
          <div className="auth-error-message-container">
            <h3 className="auth-error-message">{showError}</h3>
          </div>
        )}
        <div className="auth-input-wrapper">
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
        <button className="auth-button">Request reset</button>
      </form>
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
            Please check the email we sent to <i>{state.email}</i> in order to
            reset your password
          </h3>
        </div>
      </div>
      <Overlay isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

      {/* <div className="flex-center">
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
      </div> */}
    </>
  );
};

export default ForgotPasswordRequest;
