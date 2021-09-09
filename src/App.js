import "./App.css";
import Ecommerce from "./Router";

import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <Ecommerce />
    </Provider>
  );
}

export default App;
