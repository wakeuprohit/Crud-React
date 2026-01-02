import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
// import Simplecurd from "./component/Simplecurd.jsx";
// import UseEffect from "./component/UseEffect.jsx";
// import UseRefExample from "./component/useRefExample.jsx";
// import NewCurd from "./component/NewCurd.jsx";
import { Provider } from "react-redux";
import { store } from "./Redux/store.js";
import ReduxCurd from "./component/ReduxCurd.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    {/* <Simplecurd /> */}
    {/* <NewCurd /> */}
    {/* <UseEffect /> */}
    {/* // <UseRefExample /> */}
    <Provider store={store}>
      <ReduxCurd />
    </Provider>
  </StrictMode>
);
