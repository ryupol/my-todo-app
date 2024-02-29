import { useState, useEffect, useRef } from "react";

export default function Modal({ todos, addTodo, modalOpen, setModalOpen, addInputRef }) {
  const [message, setMessage] = useState("");
  const [modalInput, setModalInput] = useState("");
  const modalRef = useRef();

  const handleSubmit = () => {
    if (modalInput.trim()) {
      addTodo(modalInput);
      setMessage("");
      setModalInput("");
      setModalOpen(false);
    } else {
      setMessage("Please add item.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const showModal = {
    display: modalOpen ? "block" : "none",
  };

  return (
    <div className="modal-container" style={showModal}>
      <div className="modal" ref={modalRef}>
        <div className="modal-header container">
          <h3>NEW NOTE</h3>
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <input
              name="newTodo"
              type="text"
              placeholder="Input your note..."
              value={modalInput}
              onChange={(e) => setModalInput(e.target.value)}
              ref={addInputRef}
            />
          </form>
          <p className="message">{message}</p>
        </div>
        <div className="modal-button-container">
          <button
            className="cancel-button"
            onClick={(e) => {
              setModalInput("");
              setMessage("");
              setModalOpen(false);
            }}
          >
            CANCEL
          </button>
          <button
            className="apply-button"
            onClick={() => {
              handleSubmit();
              setMessage("");
            }}
          >
            APPLY
          </button>
        </div>
      </div>
    </div>
  );
}
