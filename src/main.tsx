import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/styles.scss";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import { store } from "./main/main";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
