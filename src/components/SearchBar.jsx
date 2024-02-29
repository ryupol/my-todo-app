import { useState, useRef } from "react";

export default function SearchBar({ search, setSearch }) {
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  return (
    <>
      <form className="search-container" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search note..."
          value={search}
          onChange={handleChange}
          className="search-input"
        />
        <button className="search-btn" onClick={(e) => e.preventDefault()}>
          <img src="" alt="search-icon" />
        </button>
      </form>
    </>
  );
}
