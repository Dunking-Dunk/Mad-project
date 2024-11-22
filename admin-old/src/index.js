import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { Provider } from "react-redux";
import { configureStore } from "./store/reducer";

ReactDOM.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <Provider store={configureStore()}>
        <App />
      </Provider>
    </DarkModeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
