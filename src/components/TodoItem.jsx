import { useState, useEffect, useRef } from "react";
import { FaCheck } from "react-icons/fa6";

export default function TodoItem({ itemProp, delTodo, handleChange }) {
  const [update, setUpdate] = useState(itemProp.title);
  const [editing, setEditing] = useState(false);
  const editInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (editInputRef.current && !editInputRef.current.contains(e.target)) {
        if (editing) {
          setUpdate(editInputRef.current.value);
        }
        setEditing(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (editing) {
      editInputRef.current.select();
    }
  }, [editing]);

  let viewMode = {};
  let editMode = {};
  if (editing) {
    viewMode.display = "none";
  } else {
    editMode.display = "none";
  }

  const handleEdit = (e) => {
    if (e.key === "Enter") {
      setUpdate(editInputRef.current.value);
      setEditing(false);
    } else if (e.key === "Escape") {
      editInputRef.current.value = update;
      setEditing(false);
    }
  };

  return (
    <li>
      <div className="todoitem-container">
        <label style={viewMode} className="label-container">
          <input
            style={{ display: "none" }}
            type="checkbox"
            checked={itemProp.completed}
            onChange={() => handleChange(itemProp.id)}
          />
          <span className="todo-checkbox">
            <img
              src="./src/assets/check.svg"
              alt="icon"
              className="checkmark"
            />
          </span>
          <span className="checkbox-label">{update}</span>
        </label>
        <input
          ref={editInputRef}
          type="text"
          defaultValue={update}
          onKeyDown={handleEdit}
          style={editMode}
        />
        <div className="todo-button-container">
          <button
            onClick={() => {
              setEditing(!editing);
            }}
          >
            <img className="edit-img" src="./src/assets/edit.svg" alt="icon" />
          </button>
          <button onClick={() => delTodo(itemProp.id)}>
            <img className="delete-img" src="./src/assets/delete.svg" alt="icon" />
          </button>
        </div>
      </div>
    </li>
  );
}
