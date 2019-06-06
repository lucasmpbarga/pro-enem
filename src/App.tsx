import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Login from "./views/Login";

const App = () =>
  <Provider store={store}>
    <Login />
  </Provider>

export default App;