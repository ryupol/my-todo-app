import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Dropdown({ todoFilter, setTodoFilter }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const dropdownContent = ["All", "Complete", "Incomplete"];
  const n = dropdownContent.length;
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="dropdown" ref={ref}>
      <button 
        className={`dropdown-btn${open ? " focus" : ""}`}
        onClick={() => setOpen(!open)}
      >
        {todoFilter === "Complete"
          ? "DONE"
          : todoFilter === "Incomplete"
          ? "DOING"
          : "ALL"}
        <i
          className={open ? "fa-solid fa-angle-up" : "fa-solid fa-angle-down"}
        ></i>
      </button>
      {open && (
        <div className="dropdown-content" >
          {dropdownContent.map((value, index) => (
            <div
              key={uuidv4()}
              onClick={() => {
                setTodoFilter(value);
                setOpen(false);
              }}
              style={{
                borderTopLeftRadius: index === 0 ? 4 : 0,
                borderTopRightRadius: index === 0 ? 4 : 0,
                borderBottomLeftRadius: index === n - 1 ? 4 : 0,
                borderBottomRightRadius: index === n - 1 ? 4 : 0,
              }}
            >
              {value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
