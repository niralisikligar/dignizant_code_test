// import "../fake-db";
import { Provider } from "react-redux";
import { useRoutes } from "react-router-dom";
import { MatxTheme } from "./components";
import { AuthProvider } from "./contexts/JWTAuthContext";
import { SettingsProvider } from "./contexts/SettingsContext";
import { Store } from "./redux/Store";
import routes from "./routes";
import { ToastContainer } from "react-toastify";

const App = () => {
  const content = useRoutes(routes);

  return (
    <Provider store={Store}>
      <SettingsProvider>
        <MatxTheme>
          <AuthProvider>{content}</AuthProvider>
          <ToastContainer />
        </MatxTheme>
      </SettingsProvider>
    </Provider>
  );
};

export default App;
