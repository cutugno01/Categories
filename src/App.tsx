//*---------------------------------------------*\\
//*------------------ App by -------------------*\\
//*-------------- Andrea Cutugno ---------------*\\
//*----- https://andreacutugno.netlify.app -----*\\
//*---------------------------------------------*\\

//*---------------------------------------------*\\
//*----------------- npm start -----------------*\\
//*--- Live Sass Compiler (from Glenn Marks) ---*\\
//*---------------------------------------------*\\

//TODO| change the gradient background with the new background in the figma project
//TODO| DRY: the function handleSetStateValue is repeated multiple times and should become a component.

//*| Hooks and Libraries
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";
import { useState, useEffect } from "react";
//TODO| uninstall js-cookie (+ remove all the commented code that uses it) if it is not going to be used in the future
//import Cookies from "js-cookie";
import axios from "axios";

//*| Styles
import "./styles/globals.css";

//*| Components
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Dashboard from "./components/Dashboard";
import ForgotPasswordRequest from "./components/auth/ForgotPasswordRequest";
import ForgotPasswordReset from "./components/auth/ForgotPasswordReset";
import CreateGame from "./components/CreateGame/CreateGame";
//import LoadingOverlay from "./components/LoadingOverlay";
import Lobby from "./components/Lobby";
//import Waves from "./components/Waves";

function App() {
  const [auth, setAuth] = useState(false);

  //const [isLoading, setIsLoading] = useState(false);
  //let doesSmallScreenMatches = window.matchMedia("(max-width: 900px)").matches;

  interface IUser {
    username: string;
    id: number;
  }

  const [user, setUser] = useState<IUser>({
    username: "",
    id: 0,
  });

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    window.location.reload();
  };

  // const readCookie = () => {
  //   const loginCookie = Cookies.get("login");
  //   loginCookie && setAuth(true);
  // };

  // axios
  //     .get(
  //       "https://onlinegameshop-samdav.nexthub.io/api/user.php?a=1&s=2&t=cutugnoandrea01@gmail.com&password=1234"
  //     )
  //     .then((response) => {
  //       console.log(response.data);
  //     });

  // const checkToken = (): boolean => {
  //   const accessToken = localStorage.getItem("jwt");
  //   console.log(accessToken);
  //   let success = false;
  //   axios
  //     .get(
  //       `https://onlinegameshop-samdav.nexthub.io/api/user.php?a=1&s=2&t=${accessToken}`
  //     )
  //     .then((response) => {
  //       console.log(response.data);
  //       if (response.data.type === "SUCCESS") {
  //         success = true;
  //       } else {
  //         success = false;
  //       }
  //     });
  //   return success;
  // };

  // Whenever the app is mounted, this useEffect will check if there is a token and if it is not expired or non-valid
  // If the token is valid, the auth state variable will be set to true.
  useEffect(() => {
    const accessToken = localStorage.getItem("jwt");
    if (
      accessToken === "" ||
      accessToken === null ||
      accessToken === undefined
    ) {
      setAuth(false);
      return;
    }
    axios
      .get(
        `https://onlinegameshop-samdav.nexthub.io/api/user.php?a=1&s=2&t=${accessToken}`
      )
      .then((response) => {
        if (response.data.response.type === "SUCCESS") {
          setAuth(true);
          const responseUsername: any = response.data.data.data.username;
          const responseId: any = response.data.data.data.ID;
          console.log(response.data);
          setUser({
            username: responseUsername,
            id: responseId,
          });
        } else {
          setAuth(false);
        }
      });
  }, []);

  // This conditional statement checks if the auth is true or not (it can only be true if the token is valid)
  // If the auth variable is false, it means that the token is non-existent or invalid, therefore, the user
  // will have to login or register and the following Router will mount
  if (!auth) {
    return (
      <div className="app">
        <Router>
          {/* <Waves doesSmallScreenMatches={doesSmallScreenMatches} /> */}
          <Routes>
            <Route path="/" element={<Dashboard auth={auth} user={user} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/request-reset-password"
              element={<ForgotPasswordRequest />}
            />
            <Route path="/reset-password" element={<ForgotPasswordReset />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </div>
    );
  }
  // If the
  return (
    <div className="app">
      <Router>
        {/* {isLoading && <LoadingOverlay />} */}
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard user={user} auth={auth} handleLogout={handleLogout} />
            }
          />
          <Route path="/create" element={<CreateGame />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="*" element={<>404</>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
