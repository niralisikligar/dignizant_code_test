import React, { createContext, useEffect, useReducer } from "react";
import axios from "axios";

import api from "../services/axiosConfig";
import { toast } from "react-toastify";
import { SuccessToast, ErrorToast } from "app/components/AlertToastification";
import { MatxLoading } from "app/components";
import { useNavigate } from "react-router-dom";

const initialState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
};

const setSession = (token) => {
  console.log("token-------123>", token);
  if (token) {
    localStorage.setItem("token", token);
    axios.defaults.headers.common["token"] = token;
  } else {
    localStorage.removeItem("token");

    delete axios.defaults.headers.common["token"];
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      const { isAuthenticated } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
      };
    }
    case "LOGIN": {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    case "REGISTER": {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }

    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialState,
  method: "JWT",
  login: () => Promise.resolve(),
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (email, password) => {
    try {
      const data1 = {
        email: email,
        password: password,
      };
      const response = await api.post("/login", data1);
      console.log("response", response.token);

      const { token, user } = response;
      // const { token } = response.token;
      console.log("tokenn >>>> ", token, "userrrr <<<<<>>>>> ", user);

      setSession(token);

      dispatch({
        type: "LOGIN",
        payload: {
          user,
        },
      });
      const data = await response;
      if (response) {
        // let currentUser = { ...response.result };
        // localStorage.setItem("user_data", JSON.stringify(currentUser));
        navigate("/");
        toast.success(SuccessToast(response.message || "Done"), {
          hideProgressBar: true,
          autoClose: "100",
        });
      }
      //  else if (response.status === 401) {
      //   toast.error(ErrorToast(response.message || "Error"), {
      //     hideProgressBar: true,
      //     autoClose: "100",
      //   });
      // }
      return data;
    } catch (error) {
      toast.error(ErrorToast("Error"), {
        hideProgressBar: true,
        autoClose: "100",
      });
    }
  };

  const regi = async (name,email,  image, password,password_confirmation) => {
    const response = await axios.post(
      "https://dignizant.com/flutter-api/public/api/register",
      {
        name,
        email,
        image,
        password,
        password_confirmation,
      }
    );
console.log("register response",response);
    const { token, user } = response;
    console.log("tokenn ----> ", token, "userrrr =====> ", user);

    setSession(token);

    dispatch({
      type: "REGISTER",
      payload: {
        user,
      },
    });
  };

  const logout = () => {
    setSession(null);
    
    localStorage.removeItem("token");
    navigate("/session/signin");
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    (async () => {
      try {
        const token = window.localStorage.getItem("token");
        // console.log("tokeennnnn >>>>> ", token);

        if (token) {
          setSession(token);
          // console.log("test123");
          // const response = await axios.get("/api/auth/profile");
          // const { user } = response.data;

          dispatch({
            type: "INIT",
            payload: {
              isAuthenticated: true,
              // user,
            },
          });
        } else {
          dispatch({
            type: "INIT",
            payload: {
              isAuthenticated: false,
              // user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INIT",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    })();
  }, []);

  if (!state.isInitialised) {
    return <MatxLoading />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "JWT",
        login,
        logout,
        regi,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
