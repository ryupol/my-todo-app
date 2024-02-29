import { useEffect, useState } from "react";
import Header from "@/components/Header";
import TodosList from "@/components/TodosList";

export default function TodoApp() {
  const changeInitialTheme = () => {
    const theme = localStorage.getItem("theme");
    return JSON.parse(theme) || false;
  };

  const [search, setSearch] = useState("");
  const [todoFilter, setTodoFilter] = useState("All");
  const [isDark, setIsDark] = useState(changeInitialTheme());

  useEffect(() => {
    document.querySelector("body").style.background = isDark
      ? "#252525"
      : "#f7f7f7";
    localStorage.setItem("theme", JSON.stringify(isDark))
  }, [isDark]);

  return (
    <div className="app-container" data-theme={isDark ? "dark" : "light"}>
      <Header
        search={search}
        setSearch={setSearch}
        todoFilter={todoFilter}
        setTodoFilter={setTodoFilter}
        isDark={isDark}
        setIsDark={setIsDark}
      />
      <TodosList search={search} todoFilter={todoFilter} />
    </div>
  );
}
