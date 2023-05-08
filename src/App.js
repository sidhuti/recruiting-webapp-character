import React, { useReducer } from "react";
import { ModalProvider } from "styled-react-modal";
import "./App.css";
import reducer from "./reducer/reducer";
import Attributes from "./components/Attributes";
import Class from "./components/Class";
import { ATTRIBUTE_LIST, CLASS_LIST } from "./consts.js";

export const AppContext = React.createContext(null);

const intialState = {
  attributes: ATTRIBUTE_LIST.map((x) => ({ name: x, value: 0 })),
  CLASS_LIST,
};

function App() {
  const [state, dispatch] = useReducer(reducer, intialState);

  return (
    <ModalProvider>
      <AppContext.Provider value={{ state, dispatch }}>
        <div className="App">
          <header className="App-header">
            <h1>React Coding Exercise</h1>
          </header>
          <section className="App-section">
            <Attributes />
            <Class />
          </section>
          <section></section>
        </div>
      </AppContext.Provider>
    </ModalProvider>
  );
}

export default App;
