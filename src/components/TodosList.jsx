import { useState, useEffect, useRef } from "react";
import TodoItem from "@/components/TodoItem";
import Modal from "@/components/Modal";
import { v4 as uuidv4 } from "uuid";

export default function TodosList({ search, todoFilter }) {
  const getInitialTodos = () => {
    const temp = localStorage.getItem("todos");
    const saveTodos = JSON.parse(temp);
    return saveTodos || []; //initialTemp
  };

  const [todos, setTodos] = useState(getInitialTodos());
  const [modalOpen, setModalOpen] = useState(false);
  const addInputRef = useRef();

  const addTodo = (title) => {
    const newTodo = { id: uuidv4(), title: title, completed: false };
    setTodos([...todos, newTodo]);
  };
  const delTodo = (id) => {
    setTodos([...todos.filter((todo) => todo.id !== id)]);
  };

  const handleChange = (id) => {
    setTodos((prevState) =>
      prevState.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      })
    );
  };

  useEffect(() => {
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos", temp);
  }, [todos]);

  const conditions = (todo) => {
    if (todoFilter === "All") {
      return true;
    } else if (todoFilter === "Complete" && todo.completed) {
      return true;
    } else if (todoFilter === "Incomplete" && !todo.completed) {
      return true;
    }
    return false;
  };
  const filtered = todos.filter((todo) => {
    if (!search) {
      return conditions(todo);
    } else {
      return todo.title.toLowerCase().includes(search) && conditions(todo);
    }
  });
  return (
    <div className="todolist-container">
      <div className="todolist">
        {filtered.length > 0 ? (
          filtered.map((todo) => (
            <ul>
              <TodoItem
                key={todo.id}
                itemProp={todo}
                addTodo={addTodo}
                delTodo={delTodo}
                handleChange={handleChange}
              />
            </ul>
          ))
        ) : (
          <div className="noitem-container">
            <img className="no-item" src="" />
            <p>Empty...</p>
          </div>
        )}
      </div>
      <button
        className="add-button"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        <img src="/add.svg" alt="" className="plus-icon" />
      </button>
      <Modal
        todos={todos}
        addTodo={addTodo}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        addInputRef={addInputRef}
      />
    </div>
  );
}
