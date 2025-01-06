import Table from "./components/Table"
import { Provider } from "react-redux";

import { store } from "./store";

import './index.css';

function App() {
  return <Provider store={store}> <Table /> </Provider>;
}

export default App
