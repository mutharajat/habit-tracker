import React from "react";
import { Provider } from "react-redux";
import HabitList from "./components/HabitList";
import store from "./store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <HabitList />
    </Provider>
  );
};

export default App;
