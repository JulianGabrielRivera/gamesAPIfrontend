import { useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../services/authService";
import { LoadingContext } from "./loading.context";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { setIsLoading, setUser, setMessage, user, message } =
    useContext(LoadingContext);

  const navigate = useNavigate();

  const authenticateUser = () => {
    const token = localStorage.getItem("authToken");

    setIsLoading(true);

    if (token) {
      get("/auth/verify")
        .then((results) => {
          console.log("Are we logged in?", results.data);
          setUser(results.data);
        })
        .catch((err) => {
          localStorage.clear();
          setIsLoading(false);
          setMessage(err.message);
          console.log(err.message);
        })
        .finally(() => {
          setIsLoading(false);
          console.log("This is the user", user);
          // console.log("LINee 38 message", message)
        });
    } else {
      localStorage.clear();
      setIsLoading(false);
      setUser(null);
    }

    console.log("This is the user", user);
  };

  const logout = () => {
    localStorage.clear();
    setMessage("You are logged out.");
    console.log("we've logged out");
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider value={{ authenticateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
