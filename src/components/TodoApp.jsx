import { useEffect, useState } from "react";
import Header from "@/components/Header";
import TodosList from "@/components/TodosList";

import { Provider } from "react-redux";
import store from "../store/Store";

export default function TodoApp() {
  const changeInitialTheme = () => {
    const theme = localStorage.getItem("theme");
    return JSON.parse(theme) || false;
  };

  const [isDark, setIsDark] = useState(changeInitialTheme());

  useEffect(() => {
    document.querySelector("body").style.background = isDark
      ? "#252525"
      : "#f7f7f7";
    localStorage.setItem("theme", JSON.stringify(isDark));
  }, [isDark]);

  return (
    <Provider store={store}>
      <div className="app-container" data-theme={isDark ? "dark" : "light"}>
        <Header isDark={isDark} setIsDark={setIsDark} />
        <TodosList />
      </div>
    </Provider>
  );
}
